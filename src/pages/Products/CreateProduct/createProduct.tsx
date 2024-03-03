import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { storage } from "@services/api/storage";
import { IProducts } from "@interfaces/index";

const createProductSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  quantity: z.string().nonempty("Quantidade obrigatória"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function CreateProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  async function createProduct(data: IProducts) {
    const userId = storage.getUserId();

    data.userId = await Number(userId);
    await api.user.createProduct(data);
    navigate("/home");
  }

  return (
    <Grid
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      marginTop="2rem"
    >
      <Typography variant="h4" fontWeight="600">
        Novo produto:
      </Typography>
      <Card
        elevation={9}
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "3em auto",
          padding: "1rem",
        }}
      >
        <form
          onSubmit={handleSubmit(createProduct)}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Grid display="flex" flexDirection="column" gap="1rem" sx={{ height: "50%" }}>
            <TextField
              label="Nome do produto"
              size="small"
              fullWidth
              error={!!errors.name}
              helperText={errors ? errors.name?.message : ""}
              {...register("name")}
            />
            <TextField
              label="Preço"
              size="small"
              fullWidth
              error={!!errors.price}
              helperText={errors ? errors.price?.message : ""}
              {...register("price")}
            />
            <TextField
              label="Quantidade"
              size="small"
              fullWidth
              error={!!errors.quantity}
              helperText={errors ? errors.quantity?.message : ""}
              {...register("quantity")}
            />
          </Grid>
          <Grid display="flex" flexDirection="column" gap="0.75rem" width="80%" margin="0 auto">
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate("/home")}>
              Voltar
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}
