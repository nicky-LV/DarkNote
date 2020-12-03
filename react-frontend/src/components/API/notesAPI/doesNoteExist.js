import axios from "axios";
import {updateNote} from "./updateNote";
import Cookies from 'js-cookie';

export function doesNoteExist(noteSlug){
    const config = {
        headers: {
            Authorization: "Token " + Cookies.get("token")
        }
    }
    const request = axios.get(`http://127.0.0.1:8000/api/note/exists/${noteSlug}/`, config)
    return request
}