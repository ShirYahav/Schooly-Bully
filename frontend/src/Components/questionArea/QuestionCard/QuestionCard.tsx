import { Button, createTheme, ThemeProvider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuestionModel from "../../../Models/QuestionModel";
import "./QuestionCard.css";

interface QuestionCardProps {
    question: QuestionModel;
}

function QuestionCard(props: QuestionCardProps): JSX.Element {
    
    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });

    const navigate = useNavigate();

    function navigateToAddAnswer() {
        navigate(`/addAnswer/${props.question._id}`)
    };

    return (
        <div className="QuestionCard">
            <ThemeProvider theme={formTheme}>
                <div className="QuestionContainer">
                    <div className="QuestionCardText"><span className="QuestionCardSubheading">מקצוע: </span>&nbsp;{props.question.subject.subject}</div>
                    <div className="QuestionCardText"><span className="QuestionCardSubheading">ספר: </span>&nbsp;{props.question.book.name}</div>
                    <div className="QuestionCardText"><span className="QuestionCardSubheading">עמוד מספר: </span>&nbsp;{props.question.page}</div>
                    <div className="QuestionCardText"><span className="QuestionCardSubheading">שאלה מספר: </span>&nbsp;{props.question.questionNumber}</div>
                    <Box className="QuestionCardBox">
                        <Button variant="contained" color="secondary" style={{ width: '89px', height: '30px' }} size="small" onClick={navigateToAddAnswer}>הוסף תשובה</Button>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default QuestionCard;
