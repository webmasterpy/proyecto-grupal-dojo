import Login from "../components/user/Login";
import Signup from "../components/user/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";

const User = () => {
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
export default User;