import Login from "./user/Login";
import Signup from "./user/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { Bar } from "../components/Bar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserForm = () => {
  const [session, setSession] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();
  useEffect(() => {
    if(session !== ""){
      navigate("/home");
    }
  },[])

  return (
    <>
      <Bar/>
      <Container className="mt-5">
        <Row>
          <Col className="bordes-5">
            <Signup />
          </Col>
          
          <Col className="bordes-5">
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UserForm;