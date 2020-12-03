import {animated, useSpring, useTransition} from "react-spring";
import {CreateNotebookForm} from "./createNotebookForm";
import "../../../../static/css/notebooks/createNotebook.css"
import React, {useState} from 'react';
import {Button} from "react-bootstrap";


export const CreateNotebook = (passedProps) => {
    const [show, set] = useState(true)

    async function handleFormSuccess(name){
        await set(false);
        setTimeout(timer, 500)    }

    function timer(){
        passedProps.handleNotebookCreate('e', true);
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
        item && <animated.div key={key} style={props} className="container p-0 create-notebook">
            <div className="col-md">
                <h3 className="text-light pt-3 create-notebook-header">Create notebook</h3>
                <animated.hr style={hrAnimation} />
            </div>

            <div className="create-notebook-content px-5">

                <p className="pt-2 text-light text-center font-weight-light create-notebook-text">
                    Enter the name of the notebook you want to create:
                </p>

                <CreateNotebookForm
                    handleNotebookCreate={passedProps.handleNotebookCreate}
                    handleFormSuccess={handleFormSuccess}
                />
            </div>

            <div className="back-button">
                <Button variant="outline-danger" className="back-button" size="lg"
                        onClick={handleFormSuccess}> Back </Button>
            </div>

        </animated.div>
    )
}