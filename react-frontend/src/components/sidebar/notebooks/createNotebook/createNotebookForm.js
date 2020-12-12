import {useForm} from "react-hook-form";
import React from 'react';
import axios from 'axios';
import {config} from "../../../API/config";
import Cookies from 'js-cookie';

export const CreateNotebookForm = (props) => {
    const {register, handleSubmit, errors} = useForm()

    const onSubmit = (data) => {
        const payload = {
            'name': data['notebook-name']
        }
        axios.post('https://django-react-297812.ew.r.appspot.com/api/notebook/new/', payload, config)
            .then(res => {
                if(res.data.user){
                    props.handleFormSuccess(data['notebook-name'])
                    Cookies.set({'pk': res.data.user})
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    return(
        <div className="container-fluid pt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="input-group">
                        <input name="notebook-name"
                               ref={register({required: true, maxLength: 20})}
                               className="form-control shadow-none"
                               placeholder="Enter notebook name"
                               autoComplete="off"
                               style={{"border-color":"white"}}
                        />

                        <div className="input-group-append">
                            <button className="btn-outline-success btn" type="submit">Create</button>
                        </div>
                    </div>
                    <div className="center-block">
                        {errors['notebook-name'] && errors['notebook-name'].type==='required' && <p className='text-light'>This is required</p>}
                    </div>

                </div>
            </form>
        </div>
    )
}