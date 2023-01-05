import { Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerModel from "../../../Models/AnswerModel";
import store from "../../../Redux/Store";
import answersService from "../../../Services/AnswersService";
import notify from "../../../Services/NotifyService";
import AnswerCard from "../AnswerCard/AnswerCard";
import "./AnswersByQuestion.css";

function AnswersByQuestion(): JSX.Element {

    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });

    const params = useParams();
    const navigate = useNavigate();

    const [answers, setAnswers] = useState<AnswerModel[]>([]);
    const dataFetchedRef = useRef(false);

    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if(store.getState().answersState.answers.length === 0){
            const answers = window.localStorage.getItem("AnswersByQuestion");
            if ( answers !== null ) setAnswers(JSON.parse(answers));

        }else{
            setAnswers(store.getState().answersState.answers);
        }
    },[]);

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

    function navigateToAddAnswer() {
        navigate(`/addAnswer/${params.questionId}`)
    };

    function navigateToHome() {
        navigate("/home")
    };

    return (
        <div className="AnswersByQuestion">
            <ThemeProvider theme={formTheme}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} style={{ height: "75px" }}>תשובות</Typography>

                <div className="AnswersList">
                    {answers.map(a => <AnswerCard key={a._id} answer={a} deleteAnswer= {deleteAnswer}/>)}
                </div>
                <br />
                <div className="AnswersText">
                    <span> במידה ולא נמצאה תשובה שעזרה לך תוכל לפנות לאחד המומחים שלנו או להוסיף תשובה משלך</span>
                    <br />
                    <Button variant="contained" color="secondary" style={{ width: '100px', margin: '10px' }} size="small" onClick={navigateToAddAnswer}>הוסף תשובה</Button>
                    <Button variant="contained" color="secondary" style={{ width: '102px', margin: '10px' }} size="small" onClick={navigateToHome}>חזור לדף הבית</Button>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default AnswersByQuestion;
