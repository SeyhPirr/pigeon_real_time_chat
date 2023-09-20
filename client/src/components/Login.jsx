import React from "react";

import { Box, Input, Typography, Button } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch("http://localhost:8000/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          margin: "10px",
        }}
      >
        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
          Login and acces your messages.
        </Typography>
        <Input
          required
          placeholder="Username"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.5)",
            width: "30%",
            height: "7vh",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
          {...register("username")}
        />

        <Input
          required
          placeholder="Password"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.5)",
            width: "30%",
            height: "7vh",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
          {...register("password")}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ bgcolor: "rgba(255, 255, 255, 0.6)" }}
        >
          <SendOutlinedIcon />
        </Button>
      </Box>
    </form>
  );
}

export default Login;
