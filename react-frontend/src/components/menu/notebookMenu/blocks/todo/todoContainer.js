import {animated} from "react-spring";
import React from "react";
import {TodoList} from "./todoList";

export const TodoContainer = (props) => {
    return (
        <animated.div style={props.animation} className="jumbotron block todo-list-jumbotron">
            <div className="row">
                <div className="col-md-7">
                    <h2>Tasks</h2>
                    <p>Set yourself some tasks to focus on, then cross them off once completed.</p>
                    <p className="text-muted">e.g. complete chemistry notes</p>
                </div>
                <div className="col-md">
                    <TodoList />
                </div>
            </div>

        </animated.div>
    )
}