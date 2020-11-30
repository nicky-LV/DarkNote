import {useState} from "react";
import {animated, useSpring, useTransition} from "react-spring";
import {DeleteNoteForm} from "./delete-note-form";
import {deleteNote} from "../../../../API/notes/deleteNote";
import {Button} from "react-bootstrap";
import "../../../../../static/css/dashboard/notes/delete-note.css"

export const DeleteNote = (passedProps) => {
    const [show, set] = useState(true)

    async function handleFormSuccess(){
        await set(false);
        setTimeout(timer, 500)    }

    function timer(){
        passedProps.handleNoteDelete()
        passedProps.setNoteChanged(true);
        passedProps.setMenuShown(true);

    }

    const hrAnimation = useSpring({
        from: {width: "10%", "border-color": "#FFF5FFFA"},
        to: {width: "70%", "border-color": "#FFF5FFFA"},
        delay: 300
    })

    const transitions = useTransition(show, null, {
            from: {opacity: 0, marginLeft: -500},
            enter: {opacity: 1, marginLeft: 0},
            leave: {opacity: 0, marginLeft: -500}
        }
    )

    return transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props} className="container p-0 delete-note">
            <div className="col-md">
                <h3 className="text-light pt-3 delete-note-header">Delete note</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="delete-notebook-content px-5">
                <p className="pt-2 text-light text-center font-weight-light delete-note-text">
                    Confirm the deletion of this note by typing its name:
                </p>

                <p className="text-danger text-center pb-2 delete-note-note-name"> {passedProps.noteName}</p>
                <DeleteNoteForm
                    handleFormSuccess={handleFormSuccess}
                    noteSlug={passedProps.noteSlug}
                    noteName={passedProps.noteName}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>
        </animated.div>
    )
}