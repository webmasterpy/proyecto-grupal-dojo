import { useState } from "react";
import { urls } from "../utils/constans";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "./Bar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const FormPolls = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let optionsSend = [];
    let temp = Object.keys(options).map((key) => options[key]);
    temp.forEach((element) => {
      if (element.trim() !== "") optionsSend.push({ name: element, votes: 0 });
    });

    axios
      .post(urls.newPoll, {
        question: question,
        options: optionsSend,
      })
      .then((res) => navigate("/home"))
      .catch((err) => console.log(err.message));
  };

  // * Render Form Polls
  const renderFormPolls = () => {
    return (
      <>  
      <Bar/>
      <div className="container mt-3">
        
        {/* <div className="button_container">
          <button className="back_home_button" onClick={() => navigate("/home")}>Back to home</button>
        </div> */}
        
        <form className="form_poll" onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
            <label htmlFor="option1">Poll Title *</label>
              <textarea
              name="question"
              cols="30"
              rows="10"
              onChange={handleChangeQuestion}
              required
              className="form-control"
              ></textarea>
            </Col>

            <Col lg={6}>
              <label htmlFor="option1">Option 1 *</label>
              <input
                type="text"
                name="option1"
                onChange={handleOptionChange}
                required
                className="form-control"
              />
              <label htmlFor="option2">Option 2 *</label>
              <input
                type="text"
                name="option2"
                onChange={handleOptionChange}
                required
                className="form-control"
              />
              <label htmlFor="option3">Option 3</label>
              <input 
                type="text" 
                name="option3" 
                onChange={handleOptionChange} 
                className="form-control"
              />
              <label htmlFor="option4">Option 4</label>
              <input 
                type="text" 
                name="option4" 
                onChange={handleOptionChange} 
                className="form-control"
              />
            </Col>
          </Row>
          
          <Button variant="primary" type="submit">
            Submit poll
          </Button>
        </form>
      </div>
      </>
    );
  }

  return (
    <>
    {
      window.localStorage.getItem("userId") === ""
        ? navigate("/")
        : renderFormPolls()
    }
    </>
  );
};

export default FormPolls;
