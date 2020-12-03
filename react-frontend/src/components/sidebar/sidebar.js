import React from 'react';
import {ListNotebooks} from "./notebooks/retrieveNotebooks/ListNotebooks";
import {RichTextEditor} from "../draft-js/RichTextEditor";
import {Menu} from "../menu/menu";
import {CreateNotebook} from "./notebooks/createNotebook/createNotebook";
import {RenameNotebook} from "./notebooks/renameNotebook/renameNotebook";
import {DeleteNotebook} from "./notebooks/deleteNotebook/delete-notebook";
import {GetNotes} from "./notes/retrieveNotes/get-notes";
import {RichTextEditorContainer} from "../draft-js/RichTextEditorContainer";
import '../../static/css/menu.css';
import '../../static/css/blocks/blocks.css';

export class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            notebookSelected: false,
            noteSelected: false,
            notebookSlug: 'empty',
            noteSlug: 'empty',
            notebookName: '',
            deletedSlug: '',
            notebookCreated: false,
            notebookRenamed: false,
            notebookDeleted: false
        }

        this.handleNotebookClick = this.handleNotebookClick.bind(this)
        this.handleBackClick = this.handleBackClick.bind(this)
        this.handleNoteClick = this.handleNoteClick.bind(this)
        this.handleNotebookCreate = this.handleNotebookCreate.bind(this)
        this.handleRenameIconClick = this.handleRenameIconClick.bind(this)
        this.handleNotebookRename = this.handleNotebookRename.bind(this)
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind(this)
        this.handleNotebookDelete = this.handleNotebookDelete.bind(this)
    }



    handleNotebookClick(notebookSlug, notebookName){
        this.setState({
            notebookSlug: notebookSlug,
            notebookSelected: true,
            noteSelected: false,
            notebookName: notebookName
        })
    }

    handleBackClick(){
        this.setState({
            notebookSelected: false,
            noteSelected: false
        })
    }

    handleNoteClick(noteSlug, noteName){
        this.setState({
            noteSelected: true,
            noteSlug: noteSlug,
            noteName: noteName
        })
    }

    handleNotebookCreate(event, name){
        if(name){
            setTimeout(this.setState({
                notebookCreated: false
            }), 2000)
        }
        else{
            this.setState({
                notebookCreated: true
            })
        }
    }

    handleRenameIconClick(notebookSlug, notebookName){ // when the rename button is pressed, the rename menu will show due to this.state.notebookRenamed being true
        this.setState({
            notebookSlug: notebookSlug,
            notebookName: notebookName,
            notebookRenamed: true
        })
    }

    handleNotebookRename(){ // if there is any change to the notebook list, it will re-render ListNotebooks, as this.state.notebookRenamed is false
        this.setState({
            notebookRenamed: false
        })
    }

    handleDeleteIconClick(notebookSlug, notebookName){
        this.setState({
            notebookSlug: notebookSlug,
            notebookName: notebookName,
            notebookDeleted: true
        })
    }

    handleNotebookDelete(){
        this.setState({
            notebookDeleted: false
        })
    }


    render(){
        const notebookSelected = this.state.notebookSelected
        const noteSelected = this.state.noteSelected
        const notebookCreated = this.state.notebookCreated
        const notebookRenamed = this.state.notebookRenamed
        const notebookDeleted = this.state.notebookDeleted

        return(
            <div className="container-fluid">
                <div className="row" style={{height:"100vh"}}>
                    <div className="col-md-3 sidebar p-0" id="sidebar">
                        {!notebookSelected && !notebookCreated && !notebookRenamed && !notebookDeleted &&
                        < ListNotebooks
                            handleNotebookClick = {this.handleNotebookClick}
                            handleRenameIconClick = {this.handleRenameIconClick}
                            handleDeleteIconClick = {this.handleDeleteIconClick}
                            handleNotebookCreate = {this.handleNotebookCreate}
                        />}

                        {!notebookSelected && notebookCreated &&
                        <CreateNotebook
                            handleNotebookCreate={this.handleNotebookCreate}
                        />}

                        {!notebookSelected && !notebookDeleted && notebookRenamed &&
                        <RenameNotebook
                            handleNotebookRename={this.handleNotebookRename}
                            notebookSlug={this.state.notebookSlug}
                            notebookName={this.state.notebookName}
                        />}

                        {!notebookSelected && !notebookRenamed && notebookDeleted &&
                        <DeleteNotebook
                            handleNotebookDelete = {this.handleNotebookDelete}
                            notebookSlug = {this.state.notebookSlug}
                            notebookName = {this.state.notebookName}
                        />}

                        {notebookSelected && <GetNotes
                            notebookSlug={this.state.notebookSlug}
                            handleBackClick={this.handleBackClick}
                            notebookName={this.state.notebookName}
                            handleNoteClick={this.handleNoteClick}
                            handleNoteDelete={() => this.setState({noteSelected: false})}

                        />}

                    </div>
                    <div className="col-md px-4" id="rich-text-editor">

                        {notebookSelected && noteSelected &&
                        <RichTextEditorContainer
                            notebookSlug={this.state.notebookSlug}
                            noteSlug={this.state.noteSlug}
                            noteName = {this.state.noteName}
                            deletedSlug={this.state.deletedSlug}
                            key={this.state.noteSlug} />
                            }

                            {!notebookSelected && !noteSelected && <Menu
                            handleNotebookCreate={this.handleNotebookCreate} />}
                            </div>
                            </div>

                            </div>

                            )
                            }
                            }