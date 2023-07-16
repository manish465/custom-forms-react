import { Box, Button, Container, Typography, styled } from "@mui/material";
import { red } from "@mui/material/colors";
import { Children, cloneElement, useEffect, useState } from "react";

const InputError = styled(Typography)(() => ({
    color: red[500],
}));

const CustomForms = ({ children, heading, submitBtnTxt, action }) => {
    const initialFormState = {};
    const initialFormError = {};

    Children.forEach(children, (child) => {
        if (!child.props.notinput) {
            initialFormState[child.props.name] = "";
            initialFormError[child.props.name + "Error"] = "";
        }
    });

    const [valid, setValid] = useState(false);
    const [state, setState] = useState(initialFormState);
    const [error, setError] = useState(initialFormError);

    useEffect(() => {
        setValid(
            Object.values(error).reduce(
                (acc, msg) => acc && msg === "",
                true
            ) &&
                Object.values(state).reduce(
                    (acc, value) => acc && value !== "",
                    true
                )
        );
    }, [error, state]);

    const change = (target, pattern, errmsg) => {
        const { value, name } = target;

        setState((prev) => ({ ...prev, [name]: value }));
        validateField(value, name, pattern, errmsg);
    };

    const validateField = (value, name, pattern, errmsg) => {
        const temp = { ...error };
        const re = new RegExp(pattern);

        !re.test(value)
            ? (temp[name + "Error"] = errmsg)
            : (temp[name + "Error"] = "");

        setError(temp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        action(state);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" mt={10} mb={4}>
                {heading}
            </Typography>
            <form onSubmit={handleSubmit}>
                {Children.map(children, (child) => (
                    <Box mb={2}>
                        {child.props.notinput
                            ? cloneElement(child, { ...child.props })
                            : cloneElement(child, {
                                  ...child.props,
                                  value: state[child.props.name],
                                  onChange: (e) =>
                                      change(
                                          e.target,
                                          child.props.pattern,
                                          child.props.errmsg
                                      ),
                              })}
                        <InputError>
                            {error[child.props.name + "Error"]}
                        </InputError>
                    </Box>
                ))}
                <Box mt={4}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={!valid}
                    >
                        {submitBtnTxt}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CustomForms;
