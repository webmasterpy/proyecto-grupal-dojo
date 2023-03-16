import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert} from "react-bootstrap";
import axios from "axios";
import { urls } from "../utils/constans";
import { Bar } from "./Bar";


ChartJS.register(ArcElement, Tooltip, Legend);



const PollResult = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [configDou, setConfigDou] = useState(null);
  const optionsDou = {
    plugins: {
      legend: {
        display: true,
      },
    },
    radius: 150,
  };

  useEffect(() => {
    axios
      .get(urls.getPoll + params.id)
      .then((res) => {
        let labels = res.data.options?.map((x) => x.name);
        let results = res.data.options?.map((x) => x.votes);
        let temp = {
          labels: labels,
          datasets: [
            {
              data: results,
              backgroundColor: ["red", "blue", "yellow", "green"],
            },
          ],
        };
        setData(res.data);
        setConfigDou(temp);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Bar/>
      <div className="container">
        {/* <div className="button_container">
          <button className="back_home_button" onClick={() => navigate("/")}>Back to home</button>
        </div> */}
        {/* <h2 style={{marginLeft:"20px"}}>Gracias por votar!</h2> */}
        <Alert variant="success" className="text-center">
          <b>Gracias por Votar!</b>
        </Alert>
        <div className="container_chart">
          <h1>{data.question}</h1>
          <div className="chart_results">
            {configDou && <Doughnut data={configDou} options={optionsDou} />}
            <div className="votes_chart">
              {data.options?.map((el) => (
                <div className="votes_chart_div">
                  {"["+el.name + "] - " + el.votes + " votes"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollResult;
