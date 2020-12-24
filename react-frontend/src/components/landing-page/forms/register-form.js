import {useForm} from "react-hook-form";
import axios from 'axios';
import React, {useState} from "react";
import Cookies from 'js-cookie';
import {animated, useSpring} from "react-spring";
import {Button} from "react-bootstrap";
import {Redirect, useHistory} from "react-router";

export const RegisterForm = (props) => {
    const {register, handleSubmit, errors, setError} = useForm();
    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    })
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const onSubmit = (data) =>{

        if (data.password === data.confirm_password){

            axios.post("http://127.0.0.1:8000/api/register/", data)
                .then(res => {
                    Cookies.set("token", res.data.token)
                    setRedirect(true);
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

    if (redirect) {
        console.log(redirect)
        history.push('/dashboard')
    }

    return(
        <animated.div className="container-fluid p-0" style={fadeIn}>
            <animated.form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="text-light">Username</label>
                    <input name="username" className="form-control" ref={register({
                        required: true, minLength: 4, maxLength: 20
                    })} />

                    {errors.username && errors.username.type === "required" && <p className="text-danger"> Username is required </p>}
                    {errors.username && errors.username.type === "maxLength" && <p className="text-danger"> Username is too long </p>}
                    {errors.username && errors.username.type === "minLength" && <p className="text-danger"> Username is too short </p>}
                    {errors.username && errors.username.type === "api" && <p className="text-danger"> {errors.username.message} </p>}

                </div>


                <div className="form-group">
                    <label className="text-light">Email address</label>
                    <input name="email" className="form-control" ref={register(
                        {required: true}
                    )}/>
                    {errors.email && errors.email.type === "required" && <p className="text-danger"> Email is required </p>}
                    {errors.email && errors.email.type === "api" && <p className="text-danger"> {errors.email.message} </p>}
                </div>




                <div className="form-group">
                    <label className="text-light">Password</label>
                    <input name="password" className="form-control" ref={register({
                        required: true, maxLength: 30, minLength: 6
                    })} />

                    {errors.password && errors.password.type === "required" && <p className="text-danger"> Password is required </p>}
                    {errors.password && errors.password.type === "maxLength" && <p className="text-danger">Password is too long (>30 characters) </p>}
                    {errors.password && errors.password.type === "minLength" && <p className="text-danger">Password is too short </p>}
                </div>


                <div className="form-group">
                    <label className="text-light">Confirm password</label>
                    <input name="confirm_password" className="form-control" ref={register({
                        required: true, maxLength: 30, minLength: 6
                    })}/>

                    {errors.confirm_password && errors.confirm_password.type === "required" && <p className="text-danger"> Password is required </p>}
                    {errors.confirm_password && errors.confirm_password.type === "maxLength" && <p className="text-danger"> Password is too long (>30 characters) </p>}
                    {errors.confirm_password && errors.confirm_password.type === "minLength" && <p className="text-danger">Password is too short </p>}
                    {errors.confirm_password && errors.confirm_password.type === "doesNotMatch" && <p className="text-danger"> {errors.confirm_password.message} </p>}
                </div>


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

            </animated.form>
        </animated.div>
    )


}

