import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { urls } from "../utils/constans";
import { useNavigate } from "react-router-dom";
import { Bar } from "./Bar";


export const VotePoll = (props) => {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleClickButton = (id_vote) => {
    let url = "/api/polls/" + params.id + "/votes/" + id_vote;
    axios
      .put(url)
      .then((res) => {console.log(res.data)
        navigate(urls.chart + params.id)
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get(urls.getPoll + params.id)
      .then((res) => {
        setData(res.data);
        console.log({ ...res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Bar/>
    <div className="container_vote">
      <h1>{data.question ?? "No se pudo obtener datos"}</h1>
      <div className="vote_items_list">
        {data.options?.map((el, index) => (
          <div className="vote_item" key={index}>
            <h1>{el.name}</h1>
            <button onClick={() => handleClickButton(el._id)}>
              Vote {el.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
