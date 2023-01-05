import { Box, Button, createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import QuestionModel from "../../../Models/QuestionModel";
import SubjectModel from "../../../Models/SubjectModel";
import answersService from "../../../Services/AnswersService";
import notify from "../../../Services/NotifyService";
import questionService from "../../../Services/QuestionsService";
import "./SearchQuestion.css";

function SearchQuestion(): JSX.Element {

    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });
    const navigate = useNavigate();
    const [question, setQuestion] = useState<QuestionModel>();
    const [subjects, setSubjects] = useState<SubjectModel[]>();
    const [books, setBooks] = useState<BookModel[]>();
    const [pages, setPages] = useState<number[]>();
    const [isAnswerExists, setIsAnswerExists] = useState<boolean>(null)

    const {register, handleSubmit, formState} = useForm<QuestionModel>();

    useEffect(()=> {
        questionService.getSubjects()
        .then(subjects => setSubjects(subjects))
        .catch(err=> notify.error(err));
    },[]);

    async function handleChangeSubject (e:any) {
        const subjectId = e.target.value;
        questionService.getBooksBySubjectId(subjectId)
        .then(books => setBooks(books))
        .catch(err=> notify.error(err));
    }

    async function handleChangeBook (e:any) {
        const bookId = e.target.value;
        questionService.getBookById(bookId)
        .then(book => {
            const pagesArray = Array.from({length: book.pages}, (_, i) => i + 1)
            setPages(pagesArray)
        })
        .catch(err => notify.error(err));
    }

    //search for a question
    //If the question doesn't exist add it to the list (DB)
    //If it does search for an answer
    async function submit(question: QuestionModel) {
        window.localStorage.removeItem('AnswersByQuestion');
        await questionService.getQuestionByValues(question.bookId, question.page, question.questionNumber)
        .then(async questionArray => {
            
            if(questionArray.length === 0){
                try{
                    await questionService.addQuestion(question)
                    .then(question => setQuestion(question))
                    .catch(err => notify.error(err));
                    setIsAnswerExists(false);

                    }
                    catch(err:any){
                        notify.error(err)
                    }
                }
                else {

                    const questionId = questionArray[0]._id
                    await answersService.getAnswersByQuestionId(questionId)
                    .then(answers => {
                        answers.length === 0 ? setIsAnswerExists(false) : navigate(`/answers/${questionId}`);
                        window.localStorage.setItem('AnswersByQuestion', JSON.stringify(answers));
                    })
                    .catch(err => notify.error(err));
                }                
            })
            .catch(err => notify.error(err));
    }

    function navigateToAddAnswer() {
        navigate(`/addAnswer/${question._id}`)
    };

    return (
        <div className="SearchQuestion">
            <ThemeProvider theme={formTheme}>
                <form onSubmit={handleSubmit(submit)} className="Search">

                   <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize:"26px" }} style={{ height: "55px" }}>חפש תשובה</Typography>

                    <FormControl style={{ minWidth: 330 }}>
                        <InputLabel id="group"> מקצוע </InputLabel>
                        <Select {...register("subjectId", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                        labelId="selectLabel"
                        defaultValue=''
                        label="subject"
                        onChange={handleChangeSubject} >
                            {subjects?.map(s => <MenuItem value={s._id} key={s._id} > {s.subject} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 330, marginTop: 20 }}>
                        <InputLabel id="group"> ספר </InputLabel>
                        <Select {...register("bookId", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                            labelId="selectLabel"
                            defaultValue=''
                            label="book"
                            onChange={handleChangeBook} >
                            {books?.map(b => <MenuItem value={b._id} key={b._id}> {b.name} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 330, marginTop: 20 }}>
                        <span>{formState.errors?.page?.message}</span>
                        <InputLabel id="group"> עמוד </InputLabel>
                        <Select {...register("page", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                            labelId="selectLabel"
                            defaultValue=''
                            label="page">
                            {pages?.map(p => <MenuItem value={p} key={p}> {p} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 330, marginTop: 20 }}>
                        <span>{formState.errors?.questionNumber?.message}</span>
                        <InputLabel id="group"> שאלה </InputLabel>

                        <Select {...register("questionNumber", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                            labelId="selectLabel"
                            defaultValue=''
                            label="question number">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <MenuItem value={n} key={n}> {n} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <Box justifyContent="center">
                        <Button variant="contained" color="secondary" style={{ marginTop: '25px', width: '200px' ,fontSize: '18px'}} type="submit" size="large" className="SearchButton">חפש</Button>
                    </Box>

                </form>

                <div className="Answer">
                    {isAnswerExists === null ?
                        <span> </span>
                        : 
                        <div className="NoAnswer">
                            <span>מצטערים! אין תשובה לשאלה שחיפשת. אנו בטוחים שאחד המומחים שלנו ישמח לעזור לך.</span>
                            <span>במידה ופתרת את השאלה ותרצה לעזור לאחרים נשמח שתשתף אותנו בתושבתך</span>
                            <Button variant="contained" color="secondary" style={{ width: '100px', marginTop: '13px' }} size="small" onClick={navigateToAddAnswer}>הוסף תשובה</Button>
                        </div>
                    }
                </div>

            </ThemeProvider>
        </div>
    );
}

export default SearchQuestion;
