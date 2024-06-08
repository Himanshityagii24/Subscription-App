import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react"; 
import axios from "axios";
import { useNavigate} from "react-router-dom";

interface ModalProps {
    text: string;
    variant: "primary" | "secondary" | "danger";
    isSignupFlow: boolean;
}

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            let data;
            if (isSignupFlow) {
                const { data: signUpData } = await axios.post("http://localhost:8080/auth/signup", {
                    email,
                    password
                });
                data = signUpData;
               
            } else {
                const { data: loginData } = await axios.post("http://localhost:8080/auth/login", {
                    email,
                    password
                });
                data = loginData;
            }
           navigate('/articles');
            console.log(data); // Handle response data according to your application logic
        } catch (error) {
            console.error("Error:", error);
            // Handle error according to your application logic
        }
    };

    return (
        <>
            <Button onClick={handleShow} variant={variant}>{text}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Password</InputGroup.Text>
                        <FormControl type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClick}>{text}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalComponent;
