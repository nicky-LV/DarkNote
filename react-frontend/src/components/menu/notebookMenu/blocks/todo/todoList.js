import {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {DeleteIcon} from "../deleteIcon";
import {CreateTodoMenu1} from "./createTodoMenu";
import "../../../../../static/css/blocks/todoList.css";
import React from 'react';

export const TodoList = (props) => {
    const [todoList, setTodoList] = useState([]);
    const [todoListChanged, setTodoListChanged] = useState(false);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showCreateIcon, setShowCreateIcon] = useState(false);
    const [CreateTodoMenu, setCreateTodoMenu] = useState(false);


    const handleTodoCreate = (todo) => {
        todoList.push(todo)
        localStorage.setItem("todoList", JSON.stringify(todoList))
        setTodoListChanged(true);
    }

    const handleTodoDelete = (todo) => {
        const index = todoList.indexOf(todo)
        todoList.splice(index, 1) // removes the todoItem from the list
        localStorage.setItem("todoList", JSON.stringify(todoList))
        setTodoListChanged(true);
    }

    useEffect( () => {
            setTodoListChanged(false);
            setCreateTodoMenu(false);
            if (localStorage.getItem("todoList") === null || JSON.parse(localStorage.getItem("todoList")).length === 0){
                setShowCreateIcon(true);
            }

            else if (JSON.parse(localStorage.getItem("todoList")).length > 0 && JSON.parse(localStorage.getItem("todoList")).length < 4){
                setTodoList(JSON.parse(localStorage.getItem("todoList")))
                setShowCreateIcon(true);
            }

            else{
                setTodoList(JSON.parse(localStorage.getItem("todoList")))
                if (todoList.length === 4){
                    setShowCreateIcon(false);
                }
            }



        }
        , [todoListChanged])

    return(
        <div className="todo-list-container">
            {!CreateTodoMenu &&
            <div className="todo-list">
                {todoList.map(todo => (
                        <div className="todo"
                             onMouseEnter={() => setShowDeleteIcon(true)}
                             onMouseLeave={() => setShowDeleteIcon(false)}
                        >
                            <div className="delete-icon-div">
                                {showDeleteIcon && <DeleteIcon
                                    todo = {todo}
                                    handleTodoDelete={handleTodoDelete}
                                />}
                            </div>
                            <div className="todo-name-div">
                                <p className="text-light text-center todo-name">{todo}</p>
                            </div>
                        </div>
                    )
                )}

                {showCreateIcon &&
                <Button variant="outline-success"
                        block
                        className="add-todo-button-1"
                        onClick = {() => setCreateTodoMenu(true)}
                > + </Button>}
            </div>
            }

            {CreateTodoMenu && <CreateTodoMenu1
                handleTodoCreate = {handleTodoCreate}
                setCreateTodoMenu = {setCreateTodoMenu}
            />}
        </div>
    )
}