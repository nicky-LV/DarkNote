import React from 'react';
import {useSpring, animated} from "react-spring";
import {Controls} from "./notebookMenu/blocks/controls";
import {Introduction} from "./notebookMenu/blocks/introduction";
import {TodoContainer} from "./notebookMenu/blocks/todo/todoContainer";
import '../../static/css/menu.css'


export const Menu = (props) => {

    const slideFadeIn = useSpring({
        to: {opacity: 1, marginTop: 0},
        from: {opacity: 0, marginTop: -500}
    })

    const slideUpFadeIn = useSpring({
        to: {opacity: 1, marginBottom: 0},
        from: {opacity: 0, marginBottom: -500},
    })
    return(

        <div className="container-fluid">
            <div className="row my-3" >
                <div className="col-md-7 my-2">
                    <Introduction animation={slideFadeIn} handleNotebookCreate={props.handleNotebookCreate} />
                </div>
                <div className="col-md my-2" >
                    <Controls animation={slideFadeIn} />
                </div>
            </div>
            <div className="row todo-list-row my-1 mb-3">
                <div className="col-md">
                    <TodoContainer animation={slideUpFadeIn}/>
                </div>

                <br />
                <br />

            </div>
        </div>

    )

}