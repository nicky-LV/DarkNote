import React, {useState} from "react";
import {animated, useSpring, useTransition} from "react-spring";
import {RenameNoteForm} from "./renameNoteForm";
import '../../../../static/css/notes/rename-note.css';
import {Button} from "react-bootstrap";

export const RenameNote = (passedProps) => {
    const [show, set] = useState(true)

    const hrAnimation = useSpring({
        from: {width: "10%", "border-color": "#FFF5FFFA"},
        to: {width: "70%", "border-color": "#FFF5FFFA"},
        delay: 300
    })

    async function handleFormSuccess(){
        await set(false);
        setTimeout(timer, 300)    }

    function timer(){
        passedProps.setNoteChanged(true);
        passedProps.setMenuShown(true);
    }



    const transitions = useTransition(show, null, {
            from: {opacity: 0, marginLeft: -500},
            enter: {opacity: 1, marginLeft: 0},
            leave: {opacity: 0, marginLeft: -500}
        }
    )

    return transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props} className="container p-0 rename-note">
            <div className="col-md">
                <h3 className="text-light pt-3 rename-note-header">Rename note</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="rename-note-content px-5">
                <p className="pt-2 text-light text-center font-weight-light rename-note-text">
                    Enter a new name for the note:
                </p>

                <p className="text-warning rename-note-note-name pb-2 text-center"> {passedProps.noteName}</p>
                <RenameNoteForm
                    handleFormSuccess = {handleFormSuccess}
                    noteSlug = {passedProps.noteSlug}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>
        </animated.div>
    )
}