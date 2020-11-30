import {animated, useSpring, useTransition} from "react-spring";
import {useState} from 'react';
import {CreateNoteForm} from "./create-note-form";
import {Button} from "react-bootstrap";
import "../../../../../static/css/dashboard/notes/create-note.css"


export const CreateNote = (passedProps) => {
    const [show, set] = useState(true)

    async function handleFormSuccess(noteSlug){
        await set(false);
        setTimeout(() => timer(noteSlug), 500);
    }

    function timer(noteSlug){
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
        (item && <animated.div key={key} style={props} className="container p-0 create-note">
            <div className="col-md">
                <h3 className="text-light pt-3 create-note-header">Create note</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="create-note-content px-5">

                <p className="pt-2 pb-3 text-light text-center font-weight-light create-note-text">
                    Enter the name of the note you want to create
                </p>

                <CreateNoteForm
                    handleFormSuccess = {handleFormSuccess}
                    notebookSlug = {passedProps.notebookSlug}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>
        </animated.div>)
    )
}