import {useForm} from "react-hook-form";
import axios from "axios";
import {DeleteNoteAPI} from "../../../API/notesAPI/deleteNote";

export const DeleteNoteForm = (props) => {
    const {register, handleSubmit, errors, setError} = useForm();

    const onSubmit = (data) => {
        if (data.name === props.noteName) {
            DeleteNoteAPI(props.noteSlug)
                .then(res => {
                        console.log(res.data.success)
                        props.handleFormSuccess()
                    }
                )
                .catch(err => {
                        console.log(err.response.data)
                    }
                )



        }

        else{
            setError("name",  {type: "doesNotMatch", message: "That does not match the name of the note"})
        }

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <input name="name"
                       ref={register({required: true})}
                       className="form-control shadow-none"
                       placeholder="Confirm note name"
                       autoComplete="off"
                       style = {{"border-color":"white"}}
                />
                <div className="input-group-append">
                    <button className="btn-outline-danger btn" type="submit">Confirm</button>
                </div>
            </div>
            <div className="center-block">
                { errors.name && errors.name.type === "required" && <p className="text-danger text-center font-weight-light"> Please enter the note's name </p>}
                { errors.name && errors.name.type === "doesNotMatch" && <p className="text-danger text-center font-weight-light"> {errors.name.message} </p>}
            </div>
        </form>
    )
}