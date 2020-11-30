import {animated} from "react-spring";
import React from "react";

export const Controls = (props) => (

    <animated.div style={props.animation} className="jumbotron block">
        <h2>Controls</h2>
        <br />
        <div className="row">
            <div className="col-md">
                <p>Undo  <kbd className="control"> Ctrl + Z </kbd></p>
                <p>Redo  <kbd className="control"> Ctrl + Y </kbd></p>
            </div>
            <div className="col-md">
                <p>Bold  <kbd className="control"> Ctrl + B </kbd></p>
                <p>Italic <kbd className="control"> Ctrl + I </kbd></p>

            </div>
        </div>
    </animated.div>)