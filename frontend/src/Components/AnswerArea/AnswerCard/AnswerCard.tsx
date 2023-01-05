import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerModel from "../../../Models/AnswerModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import usersService from "../../../Services/UsersService";
import config from "../../../Utils/Config";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import "./AnswerCard.css";


interface AnswerCardProps {
    answer: AnswerModel;
    deleteAnswer: (id: string) => void;
}

function AnswerCard(props: AnswerCardProps): JSX.Element {

    const params = useParams();
    const dataFetchedRef = useRef(false);
    const navigate = useNavigate();
    
    const [byUser, setByUser] = useState<UserModel>();
    const [user, setUser] = useState<UserModel>();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        setUser(store.getState().authState.user);

        usersService.getUserById(props.answer.userId)
        .then(user=> setByUser(user))
        .catch(err => notify.error(err))

    }, []);
    
    return (
        <div className="AnswerCard">
			<div className="Container">
                <div className="UserName">{byUser?.firstName +" "+ byUser?.lastName}</div>
                <div className="TextAnswer">{props.answer.textAnswer}</div>
                { props.answer.imageAnswerName 
                ?
                    <div className="ImageContainer">
                        <img className="AnswerImage" src={config.answerImageUrl + props.answer?.imageAnswerName} />
                    </div>
                :
                <span></span> 
                }

                {params.userId !== user?._id &&
                <div className="StarRating"> אשמח לדירוג
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "On" : "Off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
                }
                {props.answer?.rate 
                ? 
                <div className="AnswerRate">דירוג התשובה הוא {props.answer?.rate}/5</div>  
                : 
                <div className="AnswerRate">אין דירוג</div> }
                {user?.role === "Admin" &&
                    <button className="DeleteButton" onClick={() => props.deleteAnswer(props.answer._id)}>
                        <FaTrash className="DeleteIcon" />
                    </button>
                }
                
            </div>
        </div>
    );
}

export default AnswerCard;
