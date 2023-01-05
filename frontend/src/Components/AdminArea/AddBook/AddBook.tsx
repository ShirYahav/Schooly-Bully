import { Box, Button, createTheme, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import SubjectModel from "../../../Models/SubjectModel";
import booksService from "../../../Services/BooksService";
import notify from "../../../Services/NotifyService";
import questionService from "../../../Services/QuestionsService";
import "./AddBook.css";

function AddBook(): JSX.Element {

    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });
    
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<SubjectModel[]>();
    const {register, handleSubmit, formState} = useForm<BookModel>();


    useEffect(()=> {
        questionService.getSubjects()
        .then(subjects => setSubjects(subjects))
        .catch(err=> notify.error(err));
    },[]);

    async function submit(book: BookModel) {
        try{
            booksService.addNewBook(book)
            navigate("/home-admin")
        }
        catch(err){
            notify.error(err)
        }
    }
    
    return (
        <div className="AddBook">
			<ThemeProvider theme={formTheme}>
                <form onSubmit={handleSubmit(submit)} className="AddBookForm">
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize:"26px" }} style={{ height: "55px" }}>הוסף ספר</Typography>

                    <span>{formState.errors?.subjectId?.message}</span>
                    <FormControl style={{ minWidth: 330 }}>
                        <InputLabel id="group"> מקצוע </InputLabel>
                        <Select {...register("subjectId", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                            labelId="selectLabel"
                            defaultValue=''
                            label="subject">
                            {subjects?.map(s => <MenuItem value={s._id} key={s._id} > {s.subject} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <span>{formState.errors?.name?.message}</span>
                    <TextField {...register("name", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                        id="outlined-number"
                        label="שם הספר"
                        InputLabelProps={{ shrink: true }}
                        style={{ minWidth: 330, marginTop: "20px" }}
                    />
                        
                    <span>{formState.errors?.pages?.message}</span>
                    <TextField {...register("pages", {
                            required: { value: true, message: "שדה חובה" }
                        })}
                        id="outlined-number"
                        label="מספר עמודים בספר"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        style={{ minWidth: 330, marginTop: "20px" }}
                    />

                    <Box justifyContent="center">
                        <Button variant="contained" color="secondary" style={{ marginTop: '25px', width: '130px', fontSize: '14px' }} type="submit" size="medium" className="AddBookButton">הוסף ספר</Button>
                    </Box>
                </form>
            </ThemeProvider>
        </div>
    );
}

export default AddBook;
