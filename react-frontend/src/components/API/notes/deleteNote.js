import axios from 'axios';
import Cookies from 'js-cookie'

export function DeleteNoteAPI(noteSlug){
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }
    return axios.delete(`http://127.0.0.1:8000/api/note/delete/${noteSlug}`, config)

}