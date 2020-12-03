import {useForm} from "react-hook-form";
import React from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

export const RenameNoteForm = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    };

    const onSubmit = (data) => {
        const noteName = data.noteName
        const noteSlug = props.noteSlug

        const payload = {
            name: noteName
        }

        axios.patch(`http://127.0.0.1:8000/api/note/rename/${noteSlug}/`, payload, config)
            .then(res => {
                props.handleFormSuccess()
            })
            .catch(err => {
                console.log(err.response.data)
            })

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <input type="text"
                       name="noteName"
                       className="form-control shadow-none"
                       ref={register({required: true, maxLength: 30})}
                       autoComplete="off"
                       style={{"border-color": "white"}}
                />
                <div className="input-group-append">
                    <button className="btn-outline-warning btn" type="submit">
                        Rename
                    </button>
                </div>
            </div>
            {errors.noteName && errors.noteName.type === "required" && <p className="text-danger font-weight-light text-center">Please provide a note name</p>}
            {errors.noteName && errors.noteName.type === "maxLength" && <p className="text-danger font-weight-light text-center">Note name is too long (>30 characters)</p>}
        </form>
    )
}

