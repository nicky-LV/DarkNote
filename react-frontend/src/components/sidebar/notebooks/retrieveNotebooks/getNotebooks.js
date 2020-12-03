import React, {useState} from "react";
import {animated, useSpring} from "react-spring";
import {OptionIcon} from "../optionIcon";
import {Options} from "../options";
import {Button} from "react-bootstrap";

export const GetNotebooks = (passedProps) => {
    const [selectedNotebook, setSelectedNotebook] = useState(null) // set the selected note by storing its slug on hover event.
    const [clickedNotebook, setClickedNotebook] = useState(null)
    const [showOptions, setOptions] = useState(false)

    const animation = useSpring({
        from: {opacity: 0, marginLeft: -300},
        to: {opacity: 1, marginLeft: 0}
    })

    const hrAnimation = useSpring({
        from: {width: "10%", "border-color": "#FFF5FFFA"},
        to: {width: "70%", "border-color": "#FFF5FFFA"},
        delay: 300
    })

    const buttonContent = (notebook) => (
        <div className="notebook-name-div">
            <h7 className="text-center text-light font-weight-light notebook-name">{notebook[0]}</h7>
            {selectedNotebook === notebook[1] && <OptionIcon handleClick={() => {
                setOptions(true);
                setClickedNotebook(notebook[1])
            }} />
            }
        </div>
    )


    return(

        <div className="notebook-list">
            <div>
                <h4 className="text-light text-center font-weight-light pt-4 notebook-header">Notebooks</h4>
                <animated.hr style={hrAnimation} />
            </div>


            <animated.div style={animation}>
            {passedProps.notebookList.map(notebook => (
                <div className="notebook">
                    <button
                        value={notebook[1]}
                        onClick={e => passedProps.handleNotebookClick(notebook[1], notebook[0])}
                        className="notebook-button p-2"
                        onMouseEnter={() => setSelectedNotebook(notebook[1])}
                        onMouseLeave={() => setSelectedNotebook(null)}

                    >
                        {showOptions && clickedNotebook === notebook[1] && <Options
                        notebookSlug={clickedNotebook}
                        notebookName = {notebook[0]}
                        handleRenameIconClick={passedProps.handleRenameIconClick}
                        handleDeleteIconClick = {passedProps.handleDeleteIconClick}
                        />}
                        {showOptions && clickedNotebook !== notebook[1] && buttonContent(notebook)}
                        {!showOptions && buttonContent(notebook)}



                    </button>


                </div>))
            }
            <div className="create-notebook-button">
                    <Button variant="outline-success" className="create-notebook-button" size="lg" block
                            onClick={() => {
                                passedProps.handleNotebookCreate()
                            }}>
                        +
                    </Button>
                </div>

            </animated.div>

        </div>
    )
}