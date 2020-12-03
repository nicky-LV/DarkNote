import React from 'react';
import ReactDOM from 'react-dom';
import Draft from 'draft-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Editor, EditorState, getDefaultKeyBinding, RichUtils, ContentState, convertFromHTML} from 'draft-js';
import './RichTextEditor.css'
import {stateToHTML} from 'draft-js-export-html';
import {updateNote} from "../API/notesAPI/updateNote";
import {doesNoteExist} from "../API/notesAPI/doesNoteExist";

export class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            timer: 0,
            content: "<p><br></p>"
        };

        this.focus = () => this.refs.editor.focus() && this.timer;
        this.onChange = (editorState) => this.setState({editorState}); // todo: at a set interval, send HTML from editorState to server

        this.timer = this.timer.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/note/get/content/${this.props.noteSlug}/`, {
            headers: {
                Authorization: "Token " + Cookies.get("token")}
        })
            .then(res => {
                const blocksFromHTML = convertFromHTML(res.data.success);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                this.setState({editorState: EditorState.createWithContent(state)})
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({timer: 0}) // resets timer when switching from selected note -> another note
        this.time = setInterval(this.timer, 1000) // every second, this.timer will run, sending an API request every 5 seconds


    }

    componentWillUnmount() {
        clearInterval(this.time) // resets timer (so it doesn't carry onto a future re-render of the component)
        // In case the user made a change to the note within 5 seconds and it didn't save due to changing the note
        const data = {
            content: stateToHTML(this.state.editorState.getCurrentContent())
        }

        doesNoteExist(this.props.noteSlug)
            .then( res => {
                if (res.data.success){
                    updateNote(data, this.props.notebookSlug, this.props.noteSlug)
                }

                else if(res.data.error){
                    console.log("Note deleted")
                }
                }
            )
            .catch(err => {
                console.log(err.response.data)
            })

        if (this.props.noteSlug !== this.props.deletedSlug){

        }


    }

    timer(){
        if(this.props.noteSlug === null){
            console.log("No note selected")
        }

        else {
            if (this.state.timer === 5) {
                if (this.state.content === stateToHTML(this.state.editorState.getCurrentContent())) // If note's content has not been updated by the user
                {
                    this.setState({timer: 0}) // reset the timer
                } else {
                    const noteContent = stateToHTML(this.state.editorState.getCurrentContent()) // If the note's content has been updated
                    const data = { // send API request with the note's name and content
                        content: noteContent
                    }

                    updateNote(data, this.props.notebookSlug, this.props.noteSlug)
                    this.setState({timer: 0}) // reset timer
                    this.setState({content: noteContent}) // update note content within the state to check if there have been updates on its next run
                }
            } else {
                console.log(this.state.timer)
                this.setState({timer: this.state.timer + 1})

            }
        }
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);



        if (newState) {
            this.onChange(newState);
            return true;

        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'Bullet point', style: 'unordered-list-item'},
    {label: 'List', style: 'ordered-list-item'}
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};