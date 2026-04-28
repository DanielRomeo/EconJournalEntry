import { useEffect, useState } from "react";
import { Col, Row, FormGroup, Button, Modal, Form } from "react-bootstrap";
import { auth, db } from "../_components/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { uploadImageToCloudinary } from "../_components/cloudinaryUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	firstname: yup.string().required("First name is required"),
	lastname: yup.string().required("Last name is required"),
	type: yup.string().required("Who do you want to join as"),
	bio: yup.string().max(280, "Bio should be under 280 characters"),
	facebook: yup.string().optional(),
	instagram: yup.string().optional(),
	x: yup.string().optional(),
	linkedin: yup.string().optional(),
});

interface StateType {
	image?: string;
	firstname: string;
	lastname: string;
	email: string;
	type: string;
	bio: string;
	facebook: string;
	instagram: string;
	x: string;
	linkedin: string;
}

const EditAccountModal = (props: any) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
	const [formData, setFormData] = useState<StateType>({
		image: "",
		firstname: "",
		lastname: "",
		email: "",
		type: "",
		bio: "",
		facebook: "",
		instagram: "",
		x: "",
		linkedin: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setFormData(props.userdata);
		if (props.userdata) {
			setValue("email", props.userdata.email || "");
			setValue("firstname", props.userdata.firstname || "");
			setValue("lastname", props.userdata.lastname || "");
			setValue("type", props.userdata.type || "reader");
			setValue("bio", props.userdata.bio || "");
			setValue("facebook", props.userdata.facebook || "");
			setValue("instagram", props.userdata.instagram || "");
			setValue("x", props.userdata.x || "");
			setValue("linkedin", props.userdata.linkedin || "");
		}
	}, [props.userdata, setValue]);

	const handleClose = () => {
		props.onHide();
		location.reload();
	};

	const onSubmit = async (newUserData: any) => {
		setIsLoading(true);
		onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setIsLoading(false);
				return;
			}

			try {
				let imageUrl = formData.image || "";
				if (profileImageFile) {
					imageUrl = await uploadImageToCloudinary(profileImageFile, "profiles");
				}

				const userRef = doc(db, "users", user.uid);
				await updateDoc(userRef, { ...newUserData, image: imageUrl });
				setIsLoading(false);
				location.reload();
			} catch (error) {
				console.error("Error updating user data:", error);
				setIsLoading(false);
				location.reload();
			}
		});
	};

	return (
		<Modal
			{...props}
			size="lg"
			backdrop="static"
			aria-labelledby="contained-modal-title-vcenter"
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit your profile</Modal.Title>
			</Modal.Header>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<FormGroup className="mb-3">
						<Form.Label htmlFor="profileImage">Profile image</Form.Label>
						<input
							className="form-control"
							type="file"
							id="profileImage"
							accept="image/*"
							onChange={(event) => {
								const file = event.target.files?.[0];
								if (file) {
									setProfileImageFile(file);
								}
							}}
						/>
					</FormGroup>

					<Row>
						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="firstName">First name</Form.Label>
								<input
									{...register("firstname")}
									className="form-control"
									type="text"
									id="firstName"
								/>
								{errors.firstname && (
									<span style={{ color: "red" }}>{errors.firstname.message}</span>
								)}
							</FormGroup>
						</Col>

						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="lastName">Last name</Form.Label>
								<input
									{...register("lastname")}
									className="form-control"
									type="text"
									id="lastName"
								/>
								{errors.lastname && (
									<span style={{ color: "red" }}>{errors.lastname.message}</span>
								)}
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<FormGroup className="mb-3">
							<Form.Label htmlFor="bio">Bio</Form.Label>
							<textarea
								{...register("bio")}
								className="form-control"
								id="bio"
								rows={3}
							/>
							{errors.bio && (
								<span style={{ color: "red" }}>{errors.bio.message as string}</span>
							)}
						</FormGroup>
					</Row>

					<Row>
						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="facebook">Facebook</Form.Label>
								<input {...register("facebook")} className="form-control" type="text" id="facebook" />
							</FormGroup>
						</Col>
						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="instagram">Instagram</Form.Label>
								<input {...register("instagram")} className="form-control" type="text" id="instagram" />
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="x">X (Twitter)</Form.Label>
								<input {...register("x")} className="form-control" type="text" id="x" />
							</FormGroup>
						</Col>
						<Col lg="6" md="6" sm="12">
							<FormGroup className="mb-3">
								<Form.Label htmlFor="linkedin">LinkedIn</Form.Label>
								<input {...register("linkedin")} className="form-control" type="text" id="linkedin" />
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<FormGroup className="mb-3">
							<select
								{...register("type")}
								className="form-select"
								aria-label="Default select example"
							>
								<option value="reader">Reader</option>
								<option value="writer">Writer</option>
							</select>
							{errors.type && <span style={{ color: "red" }}>{errors.type.message}</span>}
						</FormGroup>

						<FormGroup className="mb-3">
							<Form.Label htmlFor="email">Email address</Form.Label>
							<input disabled {...register("email")} className="form-control" type="email" id="email" />
						</FormGroup>
					</Row>
				</Modal.Body>

				<Modal.Footer>
					{isLoading ? (
						<Button variant="primary" disabled type="submit">
							Loading...
						</Button>
					) : (
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					)}

					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default EditAccountModal;
