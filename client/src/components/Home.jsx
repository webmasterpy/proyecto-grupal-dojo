import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Poll } from "./Poll";
import { urls } from "../utils/constans";
import { Bar } from "./Bar";

export const Home = () => {
  const [top3, setTop3] = useState([]);
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(urls.top3)
      .then((res) => {
        console.log(res.data);
        setTop3(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(urls.polls)
      .then((res) => {
        console.log("polls", res.data);
        setPolls(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // * Renderizado de la pagina home
  const renderHome = () => {
    return(
      <>
      <Bar/>
      <div className="container">
        {/* <div className="button_container">
          <button 
            className="back_home_button" 
            onClick={() => navigate("/polls/new")}>
              Create your own Poll
          </button>
        </div> */}
      
        <div className="two-columns">
          <div className="first_column">
            <h1>Top 3 Polls</h1>
            {
              top3.map(
                (poll, index) => (
                  <Poll key={"top_3" + index} poll={poll} />
                ))
            }
          </div>
      
          <div className="second_column">
            <h1>Recent Polls</h1>
            {
              polls.map(
                (poll, index) => (
                  <Poll key={"poll" + index} poll={poll} />
                ))
            }
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    {
      window.localStorage.getItem("userId") !== "" 
        ? renderHome()
        : navigate("/")
    }
    </>
  );
};
