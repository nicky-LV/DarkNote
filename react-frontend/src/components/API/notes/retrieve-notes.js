import axios from 'axios';
import {config} from "../config";

export async function RetrieveNotesAPI(notebookSlug){
    return await axios.get(`http://127.0.0.1:8000/api/note/get/${notebookSlug}/`, config)
}