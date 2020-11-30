import React from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import Cookies from 'js-cookie'


export function LoginForm(){
    const {register, handleSubmit, errors, setError} = useForm();
    const onSubmit = (data) => {
        axios.post("http://127.0.0.1:8000/api/login/", data)
            .then(response => {
                Cookies.set("token", response.data.token, {expires: 7})
            })
            .catch(error => {
                setError("username", {type: "api", message: "Username or password is incorrect"})
            }) // TODO: setError does not persist on input change. USE STATE

    }

    // TODO: Regex validation
    return(
        <form className="App" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Username</label>
                <input name="username" ref={register({required: true, maxLength: 20, minLength: 4})} className="form-control"/>
                {errors.username && errors.username.type === "required" && "Username is required"}
                {errors.username && errors.username.type === "maxLength" && "Username is too long"}
                {errors.username && errors.username.type === "minLength" && "Username is too short"}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input name="password" ref={register({required: true, maxLength:30, minLength:6})} className="form-control" />
                {errors.password && errors.password.type === "required" && "Password is required"}
                {errors.password && errors.password.type === "maxLength" && "Password is too long (>30 characters)"}
                {errors.password && errors.password.type === "minLength" && "Password is too short"}
            </div>

            {errors.username && errors.username.type === "api" && errors.username.message}

            <div className="form-group">
                <input type="submit" name="submit"/>
            </div>
        </form>
    )
}
