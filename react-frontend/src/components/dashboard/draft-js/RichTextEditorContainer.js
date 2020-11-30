import {animated, useSpring} from "react-spring";
import {RichTextEditor} from "./RichTextEditor";
import React from "react";

export const RichTextEditorContainer = (props) => {
    const fadeInAnimation = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })

    return(
        <animated.div className="container-fluid" style={fadeInAnimation}>
                            <div className="row">
                                <div className="col">
                                    <h4 className="text-light text-left font-weight-light pt-4 pb-4 selected-note-name">{props.noteName}</h4>
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col">
                                    <RichTextEditor
                                        notebookSlug={props.notebookSlug}
                                        noteSlug={props.noteSlug}
                                        deletedSlug={props.deletedSlug}
                                        key={props.noteSlug}
                                    />
                                </div>
                            </div>
                        </animated.div>
    )
}