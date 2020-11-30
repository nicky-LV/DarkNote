import React, {useState} from "react";
import {animated, useSpring, useTransition} from "react-spring";
import {DeleteNotebookForm} from "./delete-notebook-form";
import '../../../../../static/css/dashboard/notebooks/delete-notebook.css';
import {Button} from "react-bootstrap";

export const DeleteNotebook = (passedProps) => {
    const [show, set] = useState(true)

    async function handleFormSuccess(){
        await set(false);
        setTimeout(timer, 500)    }

    function timer(){
        passedProps.handleNotebookDelete();
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
        item && <animated.div key={key} style={props} className="container p-0 delete-notebook">
            <div className="col-md">
                <h3 className="text-light pt-3 delete-notebook-header" style={{"text-align": "center"}}>Delete notebook</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="delete-notebook-content px-5">

                <p className="pt-2 text-light text-center font-weight-light delete-notebook-text">
                    Confirm the deletion of this notebook by typing its name:
                </p>

                <p className="text-danger text-center pb-2 delete-notebook-notebook-name"> {passedProps.notebookName}</p>
                <DeleteNotebookForm
                    handleNotebookDelete={passedProps.handleNotebookDelete}
                    handleFormSuccess={handleFormSuccess}
                    notebookSlug={passedProps.notebookSlug}
                    notebookName={passedProps.notebookName}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>
        </animated.div>
    )
}