import {animated} from "react-spring";
import React from "react";
import {CreateNotebookButton} from "./createNotebookButton";

export const Introduction = (props) => (
    <animated.div style={props.animation} className="jumbotron block">
        <h2>Let's get started</h2>
        <p>Create your first notebook to start</p>
        <p>
        <CreateNotebookButton handleNotebookCreate={props.handleNotebookCreate}/>
        </p>
    </animated.div>
)