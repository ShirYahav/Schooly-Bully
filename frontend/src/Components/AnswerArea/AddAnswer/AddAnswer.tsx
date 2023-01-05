import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import AnswerModel from "../../../Models/AnswerModel";
import { BsFillCameraFill } from "react-icons/bs";
import "./AddAnswer.css";
import { useNavigate, useParams } from "react-router-dom";
import answersService from "../../../Services/AnswersService";
import notify from "../../../Services/NotifyService";

function AddAnswer(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, formState } = useForm<AnswerModel>();
    const navigate = useNavigate();

    const formTheme = createTheme({
        typography: {
            h4: {
                color: '#04173b'
            }
        },
        palette: {
            primary: { main: '#e6e6e6' },
            secondary: { main: '#04173b' }
        }
    });

    async function submit(answer:AnswerModel) {
        answer.questionId = params.questionId;
        try{
            answersService.addNewAnswer(answer)
            navigate(`/`)
        }
        catch(err){
            notify.error(err)
        }
    }

    function navigateToHome() {
        navigate("/home")
    };

    return (
        <ThemeProvider theme={formTheme}>
            <div className="AddAnswer">
                <form onSubmit={handleSubmit(submit)}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} style={{ height: "55px", fontSize:"26px"}}>הוספת תשובה</Typography>

                        <span className="FormValidation">{formState.errors?.textAnswer?.message}</span>
                        <TextField label="תשובה טקסטואלית" variant="outlined" color="secondary" style={{ height: "90px", width: "380px" }} {...register("textAnswer", { required: { value: true, message: "שדה חובה" } })} />

                        <div className="ImageDiv">
                            <label className="ImageLabel">תמונה<BsFillCameraFill style={{ width: "50px", height: "28px" }}></BsFillCameraFill>
                                <span className="FormValidation">{formState.errors.imageAnswer?.message}</span>
                                <input className="ImageInput" type="file" accept="image/*" {...register("imageAnswer")} />
                            </label>
                        </div>
                            <Button variant="contained" color="secondary" style={{ marginTop: '25px', width: '130px', fontSize: '15px' }} type="submit">הוסף</Button>
                        <Box>
                            <Button variant="contained" color="primary" style={{ marginTop: '25px', width: '150px', marginLeft:"10px" }} type="reset">איפוס טופס</Button>
                            <Button variant="contained" color="primary" style={{ marginTop: '25px', width: '150px', marginRight:"10px" }} onClick={navigateToHome}> חזור לדף הבית</Button>
                        </Box>
                    </Box>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default AddAnswer;
