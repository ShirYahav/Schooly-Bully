import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnswerModel from "../../../Models/AnswerModel";
import QuestionModel from "../../../Models/QuestionModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import answersService from "../../../Services/AnswersService";
import notify from "../../../Services/NotifyService";
import questionService from "../../../Services/QuestionsService";
import config from "../../../Utils/Config";
import AnswerCard from "../../AnswerArea/AnswerCard/AnswerCard";
import QuestionCard from "../../questionArea/QuestionCard/QuestionCard";
import { HiOutlinePlusCircle } from 'react-icons/hi';
import "./MyProfile.css";

function MyProfile(): JSX.Element {

    const params = useParams();
    const [user, setUser] = useState<UserModel>();
    const [questions, setQuestions] = useState<QuestionModel[]>();
    const [answers, setAnswers] = useState<AnswerModel[]>();

    useEffect(() => {

        setUser(store.getState().authState.user);

        questionService.getQuestionsByUserId(params.userId)
        .then(questions => setQuestions(questions))
        .catch(err=> notify.error(err));

        answersService.getAnswersByUserId(params.userId)
        .then(answers => setAnswers(answers))
        .catch(err=> notify.error(err));

        const unsubscribeMe = store.subscribe(() =>{
            setUser(store.getState().authState.user);
        });
        return () => unsubscribeMe(); 

    }, []);

    async function deleteAnswer(id: string) {
        try {
            if (window.confirm('Are you sure you want to continue?')){
                await answersService.deleteOneAnswer(id);
                notify.success("Answer has been deleted");
                const newAnswers = [...answers];
                const indexToDelete = newAnswers.findIndex(a => a._id === id);
                newAnswers.splice(indexToDelete, 1);
                setAnswers(newAnswers);
            } else {
                notify.success('הפעולה בוטלה בהצלחה')
            }
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    
    return (
        <div className="MyProfile">
			<img className="UserImageProfile" src={config.userImageUrl + user?.imageName} />
			<Typography variant="h4" sx={{ fontWeight: 'bold', marginTop:"10px", fontSize:" 26px" }} style={{ height: "75px" }}>{user?.firstName +  " " + user?.lastName}</Typography>
            <h4 className="ProfileRate"> דירוג{" "+ user?.rate}</h4>
            {user?.role === "Admin" &&
                <Link to={"/newBook"} className="NewBookLink">הוסף ספר חדש <HiOutlinePlusCircle /></Link>
            }
            {questions?.length === 0 ?
                <span className="ProfileSubheading">יופי! אנו רואים שכרגע אין לך שאלות</span>
                :
                <>
                <span className="ProfileSubheading">השאלות שלי</span>
                <div className="QuestionsContainer">
                    {questions?.map(q => <QuestionCard key={q._id} question={q} />)}
                </div>
                </>
            }
            <br />
            {answers?.length === 0 ?
                <span className="ProfileSubheading">אין כרגע פתרונות</span>
                :
                <div>
                    <span className="ProfileSubheading">הפתרונות שלי</span>
                    <div className="AnswersContainer">
                        {answers?.map(a => <AnswerCard key={a._id} answer={a} deleteAnswer= {deleteAnswer}/>)}
                    </div>
                </div>
            }
        </div> 
    );
}

export default MyProfile;
