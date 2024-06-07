import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react"; 

interface  ModalProps {
    text: string;
    variant: "primary" | "secondary" | "danger";
}

const ModalComponent = ({text,variant}: ModalProps) =>{
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow (true)
    return (
        <>
        <Button onClick = {handleShow} variant={variant}>{text}</Button>
         <Modal show = {show} onHide = {handleClose}>
            <Modal.Header>
                <Modal.Title>{text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Email</InputGroup.Text>
                    <FormControl type = "email"/>
                 </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>password</InputGroup.Text>
                    <FormControl type = "password"/>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = "secondary" onClick = {handleClose}>Close</Button>
                <Button variant = "secondary">{text}</Button>
            </Modal.Footer>
           </Modal>
        </>
    )
}

export default ModalComponent;