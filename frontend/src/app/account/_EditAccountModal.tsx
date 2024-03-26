import { useEffect, useState } from 'react';
import { Col, Row, FormGroup, Button, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// validator libs
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setDefaultResultOrder } from 'dns';

// Schema
const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    type: yup.string().required("Who do you want to join as"),
    
}); // end of schema

interface StateType {
	thumbnail?: string,
	firstname: string,
	lastname: string,
	email: string,
	type: string
}


const EditAccountModal = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const [formData, setFormData] = useState<StateType>({
		thumbnail: '',
		firstname: '',
		lastname: '',
		email: '',
		type: ''
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
        setValue // this is the key, right here
	} = useForm({ 
        defaultValues: formData || {
            email: "",
            firstname: "",
            lastname: "",
            type: "",
        },
        resolver: yupResolver(schema) 
    });

	
    // useEffect
    useEffect(() => {
        setFormData(props.userdata);

        if (formData) {
            setValue('email', formData.email);
            setValue('firstname', formData.firstname);
            setValue('lastname', formData.lastname);
            setValue('type', formData.type);
            // ... set other fields
          }

    }, [formData])

    // handle close function:
    const handleClose = ()=>{
        props.onHide();
        location.reload();
    }

    // onSubmit function:
    const onSubmit = (data: any)=>{
        
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
                <Modal.Title>Edit your profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="firstName">
                                    First name
                                </Form.Label>
                                <input
                                    {...register("firstname")}
                                    className={`form-control`}
                                    type="text"
                                    id="firstName"
                                    value={props.userdata.firstname}
                                />
                                {errors.firstname && (
                                    <span style={{ color: "red" }}>
                                        {errors.firstname.message}
                                    </span>
                                )}
                            </FormGroup>
                        </Col>

                        <Col lg="6" md="6" sm="12">
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="lastName">
                                    Last name
                                </Form.Label>
                                <input
                                    {...register("lastname")}
                                    className={`form-control`}
                                    type="text"
                                    id="lastName"
                                />
                                {errors.lastname && (
                                    <span style={{ color: "red" }}>
                                        {errors.lastname.message}
                                    </span>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <FormGroup className="mb-3">
                            <select
                                {...register("joiningas")}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option value="reader">Reader</option>
                                <option value="writer">Writer</option>
                            </select>
                            {errors.joiningas && (
                                <span style={{ color: "red" }}>
                                    {errors.joiningas.message}
                                </span>
                            )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <input
                                disabled
                                {...register("email")}
                                className={`form-control`}
                                type="email"
                                id="email"
                            />
                            
                        </FormGroup>
                    </Row>
                </form>

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