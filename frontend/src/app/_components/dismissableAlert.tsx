import { useState } from "react";
import { Alert, Button, Col } from "react-bootstrap";

export type alertProps = {
	color: string ;
	information: string;
};

import Styles from './_styles/dismissableAlert.module.scss'

const AlertDismissible = (props: alertProps) => {
	const [show, setShow] = useState(true);

	return (
		<>
			<Alert show={show} className={props.color === 'green' ? Styles.success : Styles.error}>
				<div className="row">
					<Col lg='10' md='10' sm='10'>
						<p>{props.information}</p>
					</Col>

					<Col lg='2' md='2' sm='2'>
						<Button
							onClick={() => setShow(false)}
							// variant="outline-success"
							className={props.color === 'green' ? Styles.buttonSuccess : Styles.buttonError}
						>
							X
						</Button>
					</Col>
				</div>
			</Alert>

			{/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
		</>
	);
};

export default AlertDismissible;