import {useForm} from "react-hook-form";
import axios from 'axios';
import React from "react";
import Cookies from 'js-cookie';

export function RegisterForm(){
    const {register, handleSubmit, errors, setError} = useForm();

    const onSubmit = (data) =>{

        if (data.password === data.confirm_password){

            axios.post("http://127.0.0.1:8000/api/register/", data)
                .then(res => {
                    Cookies.set("token", res.data.token)
                })
                .catch(err => {
                    const response = err.response.data
                    if (response.email){
                        setError("email", {type: "api", message: response.email})
                    }

                    else if (response.username){
                        setError("username", {type: "api", message: response.username})
                    }
                })
        }

        else{
            setError("confirm_password", {type: "doesNotMatch", message: "Passwords do not match"})
        }

    }

    return(
        <div className="container-fluid">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="text-muted">Username</label>
                    <input name="username" className="form-control" ref={register({
                        required: true, minLength: 4, maxLength: 20
                    })} />
                </div>
                {errors.username && errors.username.type === "required" && "Username is required"}
                {errors.username && errors.username.type === "maxLength" && "Username is too long"}
                {errors.username && errors.username.type === "minLength" && "Username is too short"}
                {errors.username && errors.username.type === "api" && errors.username.message}

                <div className="form-group">
                    <label className="text-muted">Email address</label>
                    <input name="email" className="form-control" ref={register(
                        {required: true}
                    )}/>
                </div>
                {errors.email && errors.email.type === "api" && errors.email.message}


                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input name="password" className="form-control" ref={register({
                        required: true, maxLength: 30, minLength: 6
                    })} />
                </div>
                {errors.password && errors.password.type === "required" && "Password is required"}
                {errors.password && errors.password.type === "maxLength" && "Password is too long (>30 characters)"}
                {errors.password && errors.password.type === "minLength" && "Password is too short"}

                <div className="form-group">
                    <label className="text-muted">Confirm password</label>
                    <input name="confirm_password" className="form-control" ref={register({
                        required: true, maxLength: 30, minLength: 6
                    })}/>
                </div>
                {errors.confirm_password && errors.confirm_password.type === "required" && "Password is required"}
                {errors.confirm_password && errors.confirm_password.type === "maxLength" && "Password is too long (>30 characters)"}
                {errors.confirm_password && errors.confirm_password.type === "minLength" && "Password is too short"}
                {errors.confirm_password && errors.confirm_password.type === "doesNotMatch" && errors.confirm_password.message}

                <div className="form-group">
                    <input type="submit" />
                </div>

            </form>
        </div>
    )


}

