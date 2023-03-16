import { Row, Form, Col } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';


const ValidForm = ({ isFormValid }) => {
 	return(
		isFormValid !== ""
		 ? <Row className="mb-3" >
				<Alert variant="danger" className="mt-3">{ isFormValid }</Alert>
			</Row>
			: null
	);
}

export default ValidForm;