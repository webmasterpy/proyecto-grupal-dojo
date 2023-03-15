import Login from "./user/Login";
import Signup from "./user/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";

const UserForm = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Signup />
          </Col>
          
          <Col>
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserForm;