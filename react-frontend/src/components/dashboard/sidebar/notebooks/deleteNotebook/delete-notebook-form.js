import {useForm} from "react-hook-form";
import {DeleteNotebookAPI} from "../../../../API/notebooks/delete-notebook";
import axios from "axios";
import {config} from "../../../../API/config";

export const DeleteNotebookForm = (props) => {
    const {register, handleSubmit, errors, setError} = useForm();

    const onSubmit = (data) => {
        if (data["notebook-name"] === props.notebookName) {
            DeleteNotebookAPI(props.notebookSlug, props.notebookName)
                .then( res => console.log(res.data))
                .catch( err => console.log(err.response.data))

            props.handleFormSuccess()

        }

        else{
            setError("notebook-name",  {type: "doesNotMatch", message: "That does not match the name of the notebook"})
        }

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <input name="notebook-name"
                       ref={register({required: true})}
                       className="form-control shadow-none"
                       placeholder="Confirm notebook name"
                       autoComplete="off"
                       style = {{"border-color":"white"}}
                />
                <div className="input-group-append">
                    <button className="btn-outline-danger btn" type="submit">Confirm</button>
                </div>
            </div>
            <div className="center-block">
                { errors["notebook-name"] && errors["notebook-name"].type === "required" && <p className="text-danger text-center font-weight-light"> Please enter the notebook name </p>}
                { errors["notebook-name"] && errors["notebook-name"].type === "doesNotMatch" && <p className="text-danger text-center font-weight-light"> {errors["notebook-name"].message} </p>}
            </div>
        </form>
    )
}