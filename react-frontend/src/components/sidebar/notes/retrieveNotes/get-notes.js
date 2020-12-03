import React, {useState, useEffect} from 'react';
import {animated, useSpring} from "react-spring";
import {OptionsIcon} from "../options/optionsIcon";
import {RetrieveNotesAPI} from "../../../API/notesAPI/retrieve-notes";
import {Options} from '../options/options'
import {Button} from "react-bootstrap";
import '../../../../static/css/notes/get-notes.css';
import {RenameNote} from "../renameNote/renameNote";
import {DeleteNote} from "../deleteNote/delete-note";
import {CreateNote} from "../createNote/create-note";

export const GetNotes = (props) => {
    const [noteList, setNoteList] = useState([]);
    const [noteChanged, setNoteChanged] = useState(false)
    const [selectedNote, setSelectedNote] = useState('');
    const [clickedNote, setClickedNote] = useState('');
    const [clickedNoteName, setClickedNoteName] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showRenameMenu, setShowRenameMenu] = useState(false);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [menuShown, setMenuShown] = useState(false);

    const hrAnimation = useSpring({
        from: {width: "10%", "border-color": "#FFF5FFFA"},
        to: {width: "70%", "border-color": "#FFF5FFFA"},
        delay: 300
    })

    useEffect( () => {
            const noteList = []
            RetrieveNotesAPI(props.notebookSlug)
                .then( res => {
                        res.data.success.forEach(note => {
                            noteList.push(note)
                        })
                        setNoteList(noteList) // updates the list of notesAPI, as there was a change.
                        setNoteChanged(false); // resets the "changed" state so that the note-list can be shown.
                        setMenuShown(false); // sets to false, as the create/delete/rename menus are no longer selected.
                        setShowCreateMenu(false); // revert menu
                        setShowRenameMenu(false); // revert menu
                        setShowDeleteMenu(false); // revert menu
                        setShowOptions(false); // revert options
                        setClickedNote(''); // revert clicked note
                    }
                )
                .catch(err => {
                        console.log(err.response.data)
                    }
                )
        }, [props.notebookSlug, noteChanged]
    )


    // this animations runs after a note is created/renamed/deleted, since the ternary operator has the condition menuShown.
    const animation = useSpring({
            from: {opacity: 0, marginLeft: -300},
            to: menuShown ? {opacity: 1, marginLeft: -500} : {opacity: 1, marginLeft: 0}
        }
    )

    const buttonContent = (noteName, noteSlug) => (
        <div>
            <h7 className="text-center text-light font-weight-light note-name">{noteName}</h7>

            {selectedNote === noteSlug &&
            <OptionsIcon
                handleClick={() => {
                    setShowOptions(true);
                    setClickedNote(noteSlug);
                    setClickedNoteName(noteName);
                }}

            />
            }
        </div>
    )

    return(
        <div>
            {showRenameMenu && !showDeleteMenu && !showCreateMenu && <RenameNote
                setNoteChanged = {setNoteChanged}
                setMenuShown = {setMenuShown}
                noteSlug = {clickedNote}
                noteName = {clickedNoteName}
            />}

            {showDeleteMenu && !showRenameMenu && !showCreateMenu && <DeleteNote
                setNoteChanged = {setNoteChanged}
                handleNoteDelete = {props.handleNoteDelete}
                setMenuShown = {setMenuShown}
                noteSlug = {clickedNote}
                noteName = {clickedNoteName}

            />}

            {showCreateMenu && <CreateNote
                showCreateMenu = {setShowCreateMenu}
                setMenuShown = {setMenuShown}
                setShowOptions = {setShowOptions}
                setNoteChanged = {setNoteChanged}
                setClickedNote = {setClickedNote}
                notebookSlug = {props.notebookSlug}
            />}

            {!showDeleteMenu && !showRenameMenu && !showCreateMenu &&
            <div className="note-list">
                <div className="note-header">
                    <h4 className="text-light text-center font-weight-light pt-4 note-notebook-name">{props.notebookName}</h4>
                    <animated.hr style={hrAnimation}/>
                </div>

                <animated.div className="d-flex-lg-column" style={animation}>
                    {noteList.map(note => (
                        <div style={animation} className="note">
                            <button
                                value={note[1]}
                                onClick={e => {
                                    e.stopPropagation()
                                    setClickedNote(note[1])
                                    props.handleNoteClick(note[1], note[0])
                                }}
                                className={ clickedNote === note[1] ? "note-button-active p-2" : "note-button p-2"}
                                onMouseEnter={() => setSelectedNote(note[1])}
                                onMouseLeave={() => setSelectedNote(null)}

                            >
                                {showOptions && clickedNote === note[1] && <Options
                                    showRenameMenu={setShowRenameMenu}
                                    showDeleteMenu={setShowDeleteMenu}
                                    setMenuShown = {setMenuShown}
                                />}
                                {showOptions && clickedNote !== note[1] && buttonContent(note[0], note[1])}
                                {!showOptions && buttonContent(note[0], note[1])}


                            </button>
                        </div>))
                    }

                    <div className="create-note-button">
                        <Button variant="outline-success" className="create-note-button" size="lg" block
                                onClick={() => {
                                    setMenuShown(true);
                                    setShowCreateMenu(true);

                                }}>
                            +
                        </Button>
                    </div>
                </animated.div>





                <div className="back-button">
                    <Button variant="outline-danger" className="back-button" size="lg" block
                            onClick={props.handleBackClick}> Back </Button>
                </div>

            </div>
            }
        </div>
    )


}