import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";
import { getUserData, updateUserData } from "@services/web3/user";

export const MyProfile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userCpf, setUserCpf] = useState<string>("");

  useEffect(() => {
    getUserData().then(userData => {
      if (userData != null) {
        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserCpf(userData.cpf);
      }
    });
  }, []);

  async function updateUser(event) {
    event.preventDefault();
    const data = {
      name: userName,
      email: userEmail,
      cpf: userCpf,
    };
    console.log(data);
    updateUserData(data, navigate);
  }

  return (
    <Grid display="flex" flexDirection="column" gap="4rem">
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Editar Perfil
        </Typography>
        <Box component="form" onSubmit={updateUser} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            label="Nome"
            value={userName ?? ""}
            onChange={event => {
              setUserName(event.target.value);
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            value={userEmail ?? ""}
            onChange={event => {
              setUserEmail(event.target.value);
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="cpf"
            label="CPF"
            value={userCpf ?? ""}
            onChange={event => {
              setUserCpf(event.target.value);
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Editar
          </Button>
        </Box>
      </Container>
    </Grid>
  );
};
