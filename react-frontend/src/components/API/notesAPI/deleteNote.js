import axios from 'axios';
import Cookies from 'js-cookie'

export function DeleteNoteAPI(noteSlug){
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }
    return axios.delete(`https://django-react-297812.ew.r.appspot.com/api/note/delete/${noteSlug}`, config)

}