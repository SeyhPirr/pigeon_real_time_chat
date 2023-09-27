import React, { useState } from "react";

import { Box, Input, Typography, Button } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useForm } from "react-hook-form";
import Popup from "./Popup";
import { Link } from "react-router-dom";
function Login() {
  const { register, handleSubmit } = useForm();
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/account/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.status == 200) {
        navigation.navigate("/");
      } else {
        setError("You couldn`t login.");
        setPopup(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Popup trigger={popup} setTrigger={setPopup}>
        {error}
      </Popup>
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
            type="password"
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
          <Link to="/signup">
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                ":hover": {
                  color: "grey",
                },
              }}
            >
              Create an account.
            </Typography>
          </Link>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
