import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import Cookies from 'js-cookie'
import {animated, useSpring} from "react-spring";
import {Button} from "react-bootstrap";
import {Redirect, useHistory} from "react-router";


export const LoginForm = (props) => {
    const {register, handleSubmit, errors, setError} = useForm();
    const [redirect, setRedirect] = useState(false);
    const history = useHistory()
    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })
    const onSubmit = (data) => {
        axios.post("http://127.0.0.1:8000/api/login/", data)
            .then(response => {
                Cookies.set("token", response.data.token, {expires: 7});
                setRedirect(true);
            })
            .catch(error => {
                setError("username", {type: "api", message: "Username or password is incorrect"})
            }) // TODO: setError does not persist on input change. USE STATE

    }

    if (redirect) {
        console.log(redirect)
        history.push('/')
        return <Redirect to="/dashboard"/>
    }

    // TODO: Regex validation
    return(
        <animated.div className="container-fluid p-0" style={fadeIn}>
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
                    <div className="row">
                        <div className="col">
                            <Button variant="danger" onClick={props.handleReset}>Back</Button>
                        </div>

                        <div className="col d-flex justify-content-end">
                            <Button variant="success" type="submit">Submit</Button>
                        </div>
                    </div>
                </div>


            </form>
        </animated.div>
    )
}
