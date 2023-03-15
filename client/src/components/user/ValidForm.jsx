import { Row, Form, Col } from "react-bootstrap";

const ValidForm = ({ isFormValid }) => {
 	return(
		isFormValid !== ""
		 ? <Row className="justify-content-end mb-3">
				<Form.Text 
					as={Col} 
					sm={7} 
					className="text-danger">{ isFormValid }</Form.Text>
				</Row>
			: null
	);
}

export default ValidForm;