import { zodResolver } from "@hookform/resolvers/zod";
import { IProducts } from "@interfaces/index";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import api from "@services/api";
import { storage } from "@services/api/storage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  quantity: z.string().nonempty("Quantidade obrigatória"),
});

type UpdatedProductFormData = z.infer<typeof createProductSchema>;

export function EditProduct() {
  const [product, setProduct] = useState<IProducts | null>(null);

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        try {
          const userProducts = await api.user.getProductById(productId);
          setProduct(userProducts);
        } catch (error) {
          console.error("Erro ao obter os produtos do usuário:", error);
        }
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatedProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  async function editProduct(data: IProducts) {
    const userId = storage.getUserId();

    data.userId = await Number(userId);
    if (productId) {
      await api.user.editUserProduct(data, productId);
      navigate("/home");
    }
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
        Edite as informações do produto:
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
        <form onSubmit={handleSubmit(editProduct)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Grid display="flex" flexDirection="column" gap="1rem" sx={{ height: "50%" }}>
            {product && (
              <>
                <TextField
                  label="Nome do produto"
                  size="small"
                  fullWidth
                  defaultValue={product?.name}
                  error={!!errors.name}
                  helperText={errors ? errors.name?.message : ""}
                  {...register("name")}
                />
                <TextField
                  label="Preço"
                  size="small"
                  fullWidth
                  defaultValue={product?.price}
                  error={!!errors.price}
                  helperText={errors ? errors.price?.message : ""}
                  {...register("price")}
                />
                <TextField
                  label="Quantidade"
                  size="small"
                  fullWidth
                  defaultValue={product?.quantity}
                  error={!!errors.quantity}
                  helperText={errors ? errors.quantity?.message : ""}
                  {...register("quantity")}
                />
              </>
            )}
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
