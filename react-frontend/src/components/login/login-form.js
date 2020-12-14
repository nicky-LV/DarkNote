import React from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import Cookies from 'js-cookie'
import {animated, useSpring} from "react-spring";


export function LoginForm(){
    const {register, handleSubmit, errors, setError} = useForm();
    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })
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
        <animated.div className="container-fluid" style={fadeIn}>
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="text-light">Username</label>
                    <input name="username" ref={register({required: true, maxLength: 20, minLength: 4})} className="form-control"/>
                    {errors.username && errors.username.type === "required" && <p className="text-danger">Username is required </p>}
                    {errors.username && errors.username.type === "maxLength" && <p className="text-danger"> Username is too long </p>}
                    {errors.username && errors.username.type === "minLength" && <p className="text-danger"> Username is too short </p>}
                </div>
                <div className="form-group">
                    <label className="text-light">Password</label>
                    <input name="password" ref={register({required: true, maxLength:30, minLength:6})} className="form-control" />
                    {errors.password && errors.password.type === "required" && <p className="text-danger"> Password is required </p>}
                    {errors.password && errors.password.type === "maxLength" && <p className="text-danger"> Password is too long (>30 characters) </p>}
                    {errors.password && errors.password.type === "minLength" && <p className="text-danger"> Password is too short </p>}
                </div>

                {errors.username && errors.username.type === "api" && <p className="text-danger">{errors.username.message}</p>}

                <div className="form-group">
                    <input type="submit" name="submit"/>
                </div>
            </form>
        </animated.div>
    )
}
