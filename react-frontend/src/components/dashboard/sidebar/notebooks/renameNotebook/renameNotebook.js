import React, {useState} from "react";
import {animated, useTransition, useSpring} from "react-spring";
import {RenameNotebookForm} from "./renameNotebookForm";
import '../../../../../static/css/dashboard/notebooks/renameNotebook.css';
import {Button} from "react-bootstrap";

export const RenameNotebook = (passedProps) => {
    const [show, set] = useState(true)

    async function handleFormSuccess(){
        await set(false);
        setTimeout(timer, 500)    }

    function timer(){
        passedProps.handleNotebookRename();
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
        item && <animated.div key={key} style={props} className="container p-0 rename-notebook">
            <div className="col-md">
                <h3 className="text-light pt-3 rename-notebook-header">Rename notebook</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="rename-notebook-content px-5">
                <p className="pt-2 text-light text-center font-weight-light rename-notebook-text">
                    Enter a new name for the notebook:
                </p>

                <p className="text-warning pb-2 delete-notebook-notebook-name text-center"> {passedProps.notebookName}
                </p>
                <RenameNotebookForm
                    handleNotebookRename={passedProps.handleNotebookRename}
                    handleFormSuccess={handleFormSuccess}
                    notebookSlug={passedProps.notebookSlug}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>
        </animated.div>
    )
}