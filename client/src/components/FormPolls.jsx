import { useState } from "react";
import { urls } from "../utils/constans";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="container">
      <div className="button_container">
        <button className="back_home_button" onClick={() => navigate("/home")}>Back to home</button>
      </div>
      <form className="form_poll" onSubmit={handleSubmit}>
        <textarea
          name="question"
          cols="30"
          rows="10"
          onChange={handleChangeQuestion}
          required
        ></textarea>
        <label htmlFor="option1">Option 1 *</label>
        <input
          type="text"
          name="option1"
          onChange={handleOptionChange}
          required
        />
        <label htmlFor="option2">Option 2 *</label>
        <input
          type="text"
          name="option2"
          onChange={handleOptionChange}
          required
        />
        <label htmlFor="option3">Option 3</label>
        <input type="text" name="option3" onChange={handleOptionChange} />
        <label htmlFor="option4">Option 4</label>
        <input type="text" name="option4" onChange={handleOptionChange} />
        <button type="submit">Submit poll</button>
      </form>
    </div>
  );
};

export default FormPolls;
