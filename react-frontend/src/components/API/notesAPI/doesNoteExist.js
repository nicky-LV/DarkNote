import axios from "axios";
import {updateNote} from "./updateNote";
import Cookies from 'js-cookie';

export function doesNoteExist(noteSlug){
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }
    const request = axios.get(`https://django-react-297812.ew.r.appspot.com/api/note/exists/${noteSlug}/`, config)
    return request
}