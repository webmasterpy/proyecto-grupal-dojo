import torta from "../assets/pngegg.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Bar } from "./Bar";

export const Poll = ({ poll, ...props }) => {
  const { question, createdAt, options, _id } = poll;
  const navigate = useNavigate();

  const hanldeClickButton = (id) => {
    navigate("/poll/" + id);
  };

  return (
    <>
      
      <div className="item__poll" {...props}>
        <img src={torta} className="img_poll" />
        <div className="item__poll__info">
          <div className="anchor_click" onClick={() => hanldeClickButton(_id)}>
            <h4>{question}</h4>
          </div>
          <div className="item__poll__options">
            {
              options.map((el) => 
                el.name + ": " + el.votes + " votes").join(", ")
            }
          </div>
          <div className="items__poll__date">
            <strong>{moment(createdAt).fromNow()}</strong>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
    {
      window.localStorage.getItem("userId") === "" 
        ? navigate("/")
        : ""
    }
    </>
  );
};
