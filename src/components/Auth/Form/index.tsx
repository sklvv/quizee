import { TextField, Button, Typography, FormControl } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { userLogIn, userSignUp } from "../../../store/userSlice";

const AuthForm = () => {
  const { username, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const isLogin = pathname === "/login";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      await dispatch(userLogIn({ email, password }));
      navigate("/");
    } else {
      await dispatch(userSignUp({ email, password }));
      navigate("/");
    }
  };
  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username]);
  if (isLoading) {
    return <>loading</>;
  }
  return (
    <FormControl
      sx={{ mt: "26px" }}
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        required
        type={"email"}
        size="small"
        sx={{ mt: "16px" }}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        required
        type={"password"}
        size="small"
        sx={{ mt: "16px" }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: "16px" }}
        color="primary"
        disabled={!(email && password)}
      >
        <Typography>{isLogin ? "Login" : "Sign Up"}</Typography>
      </Button>
    </FormControl>
  );
};

export default AuthForm;
