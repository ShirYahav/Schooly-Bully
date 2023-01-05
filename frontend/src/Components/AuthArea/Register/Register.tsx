import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const formTheme = createTheme({
        typography: {
            h4: {
                color: '#04173b'
            }
        },
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });

    const navigate = useNavigate();

    const {register, handleSubmit, formState} = useForm<UserModel>();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("נרשמת בהצלחה");
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }
    
    return (
        <ThemeProvider theme={formTheme}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <div className="Register">

                    <form onSubmit={handleSubmit(submit)}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} style={{ height: "80px" }}>הירשם</Typography>

                        <span className="FormValidation">{formState.errors?.firstName?.message}</span>
                        <TextField label="שם פרטי" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} {...register("firstName", { 
                            required: { value: true, message: "שדה חובה"},
                            pattern: { value: /^[a-z\u0590-\u05fe]+$/i, message: "invalid input"}, 
                            minLength: {value: 2, message: "שם קצר מדי"}, 
                            maxLength: {value: 10, message: "שם ארוך מדי"}} )} />

                        <span className="FormValidation">{formState.errors?.lastName?.message}</span>
                        <TextField label="שם משפחה" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} type="text" {...register("lastName", { 
                            required: { value: true, message: "שדה חובה"}, 
                            pattern: { value: /^[a-z\u0590-\u05fe]+$/i, message: "invalid input"},
                            minLength: {value: 2, message: "שם קצר מדי"}, 
                            maxLength: {value: 10, message: "שם ארוך מדי"} })} />

                        <span className="FormValidation">{formState.errors?.email?.message}</span>
                        <TextField label="אימייל" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} {...register("email", { 
                            required: { value: true, message: "שדה חובה"},
                            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "אימייל לא תקין"} })} />

                        <span className="FormValidation">{formState.errors?.phoneNumber?.message}</span>
                        <TextField label="מספר טלפון" variant="outlined" color="secondary" type="phoneNumber" style={{ height: "80px", width: "300px" }} {...register("phoneNumber", {
                            required: { value: true, message: "שדה חובה" },
                            pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message: "מספר טלפון שגוי" } })} />

                        <span className="FormValidation">{formState.errors?.password?.message}</span>
                        <TextField label="סיסמא" variant="outlined" color="secondary" type="password" style={{ height: "80px" , width: "300px"}} {...register("password", { 
                            required: { value: true, message: "שדה חובה"}, 
                            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "סיסמא מורכבת ממספרים ואותיות באנגלית בלבד"},
                            minLength: {value: 8, message: "סיסמא קצרה מדי"}, 
                            maxLength: {value: 20, message: "סיסמא ארוכה מדי"} })} />

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Button variant="contained" color="secondary" style={{ height: "40px", width: "150px", fontSize: '18px' }} type="submit" size="large">הירשם</Button>
                        </Box>

                    </form>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default Register;
