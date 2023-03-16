import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urls } from "../utils/constans";
import axios from "axios";
import logo from '../assets/logo.png'
import { Container, Row, Col, Button } from "react-bootstrap";


export const Bar = () => {
  const [session, setSession] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();
  console.log(session);

  const onLogout = ()=>{
    axios
      .get(urls.logout)
      .then((res) => {
        window.localStorage.setItem("userId", "");
        setSession("");
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const goCreate = ()=> {
    navigate("/polls/new");
  }

  const goHome = ()=> {
    navigate("/home");
  }

  return (
    <>
    <div className="cabecera-votos">
      <Row>
        <Col lg={6}>
          <img src={logo} width="40"/>
          <span className='texto-logo'>Voting Dojo</span>
        </Col>
        <Col lg={6} className="d-flex flex-row-reverse">
            {
              session !== "" ? 
                <>
                  <Button variant="danger" onClick={onLogout}>Logout</Button> 
                  <Button variant="primary" onClick={goCreate}>Create your Own Poll</Button>
                  <Button variant="info" onClick={goHome}>Home</Button> 
                </> 
              :" "
            }
        </Col>
      </Row>
    </div>
    </>
  )
}
