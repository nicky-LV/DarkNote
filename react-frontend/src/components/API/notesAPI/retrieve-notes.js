import axios from 'axios';
import {config} from "../config";

export async function RetrieveNotesAPI(notebookSlug){
    return await axios.get(`https://django-react-297812.ew.r.appspot.com/api/note/get/${notebookSlug}/`, config)
}