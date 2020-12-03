import {useForm} from 'react-hook-form';
import {config} from "../../../API/config";
import axios from 'axios';
import React from "react";

export const RenameNotebookForm = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        const payload = {
            name: data["notebook-name"]
        }
        axios.patch(`http://127.0.0.1:8000/api/notebook/rename/${props.notebookSlug}/`, payload, config)
            .then(res => {
                props.handleFormSuccess()
                }
            )
            .catch(err => console.log(err.response.data)
            )
    }

    return(
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <input name="notebook-name"
                               ref={register({required: true, maxLength: 20})}
                               className="form-control shadow-none"
                               placeholder="Rename notebook to"
                               autoComplete="off"
                               style = {{"border-color":"white"}}
                        />

                        <div className="input-group-append">
                            <button className="btn-outline-warning btn" type="submit">Rename</button>
                        </div>
                    </div>
                    <div className="center-block">
                        {errors['notebook-name'] && errors['notebook-name'].type==='required' && <p className='text-light font-weight-light'>Please enter a new name</p>}
                        {errors['notebook-name'] && errors['notebook-name'].type==='maxLength' && <p className="text-light font-weight-light">Name is too long (>20 characters)</p>}
                    </div>
            </form>
    )
}