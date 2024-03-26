
import { useEffect } from 'react';
import { Col, Button, Modal, Form } from 'react-bootstrap';

const EditAccountModal = (props: any) => {

    useEffect(() => {
        console.log(props);
    }, [])

    const handleClose = ()=>{
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            backdrop='static'
            aria-labelledby="contained-modal-title-vcenter"
            // centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAccountModal