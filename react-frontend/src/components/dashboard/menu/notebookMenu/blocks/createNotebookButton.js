import {Button} from "react-bootstrap";

export const CreateNotebookButton = (props) => (
        <Button variant="outline-light"
                className="create-notebook-button-block"
                onClick={props.handleNotebookCreate}>
            Create notebook
        </Button>
)