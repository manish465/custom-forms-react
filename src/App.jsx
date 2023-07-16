import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CustomForms from "./components/CustomForms";

const App = () => {
    const action = (data) => {
        console.log(data);
    };

    return (
        <CustomForms heading="Login" submitBtnTxt="Sign In" action={action}>
            <TextField
                type="text"
                name="username"
                label="Enter Your Name"
                errmsg="Username should be more then 3 characters and less 15 characters"
                pattern="^\w{3,15}$"
                variant="outlined"
                fullWidth
            />
            <TextField
                type="password"
                name="password"
                label="Enter Your Password"
                errmsg="Password should be more then 8 characters and less 20 characters"
                pattern="^\w{8,20}$"
                variant="outlined"
                fullWidth
            />
            <InputLabel notinput="true" id="role">
                Select Your Role
            </InputLabel>
            <Select
                labelId="role"
                name="role"
                pattern="^Mentor|Intern$"
                errmsg="Select a role"
            >
                <MenuItem value="Select a role" selected>
                    Select a role
                </MenuItem>
                <MenuItem value="Mentor">Mentor</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
            </Select>
        </CustomForms>
    );
};

export default App;
