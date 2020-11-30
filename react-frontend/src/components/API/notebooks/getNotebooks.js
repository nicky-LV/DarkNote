import axios from "axios";
import {config} from "../config";

export async function GetNotebooksAPI(){
    return await axios.get("http://127.0.0.1:8000/api/notebook/get/", config)
}
