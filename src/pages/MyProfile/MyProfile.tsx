import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Header } from "../../components/Header/Header";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";

const initialRegistrationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("E-mail inválido").optional(),
  cpf: z.string().optional(),
});

type CreateUserFormData = z.infer<typeof initialRegistrationSchema>;

export const MyProfile = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(initialRegistrationSchema),
  });

  async function updateUser(data: CreateUserFormData) {
    console.log(data);
    navigate("/login");
  }

  return (
    <Grid display="flex" flexDirection="column" gap="4rem">
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Editar Perfil
        </Typography>
        <Box component="form" onSubmit={handleSubmit(updateUser)} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            defaultValue="valor padrao"
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            defaultValue="valor padrao"
          />
          <TextField
            fullWidth
            margin="normal"
            id="cpf"
            label="CPF"
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            defaultValue="valor padrao"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Editar
          </Button>
        </Box>
      </Container>
    </Grid>
  );
};
