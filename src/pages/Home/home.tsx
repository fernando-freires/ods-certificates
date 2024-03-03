import { Button, Card, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "@services/api";
import { storage } from "@services/api/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { IProducts } from "@interfaces/index";

export function Home() {
  const [products, setProducts] = useState<IProducts[] | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (api.login.logout()) {
      return navigate("/login");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nome do produto", width: 220 },
    { field: "price", headerName: "Preço do produto", width: 220 },
    { field: "quantity", headerName: "Quantidade disponível", width: 220 },
  ];

  const rows = [{ id: 0, name: "loading", price: "loading", quantity: "0" }];

  useEffect(() => {
    const fetchData = async () => {
      const userId = storage.getUserId();
      if (userId) {
        try {
          const userProducts = await api.user.getProductsByUserId(userId);
          setProducts(userProducts);
        } catch (error) {
          console.error("Erro ao obter os produtos do usuário:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid width="100%" display="flex" justifyContent="center" marginTop="2rem">
        <Grid display="flex" justifyContent="space-between" flexDirection="column" alignItems="center" gap="1rem">
          <Typography variant="h4" fontWeight="600">
            Bem vindo, {storage.getUserName()?.split(" ")[0]}
          </Typography>
          <Grid display="flex" gap="1rem">
            <Button variant="contained" color="error" onClick={handleLogout}>
              Sair
            </Button>
            {products && products.length > 0 && (
              <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate("/createProduct")} fullWidth>
                Adicionar produto
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <Card
          elevation={9}
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "2em auto",
            padding: "1rem",
          }}
        >
          {products && products.length > 0 ? (
            <DataGrid
              rows={products ? products : rows}
              onRowClick={value => navigate(`/product/edit/${value.id}`)}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          ) : (
            <Grid width="100%" height="20vh" display="flex" flexDirection="column" gap="2rem" alignItems="center">
              <Typography variant="h6" fontWeight="600">
                Que tal adicionar um novo produto, {storage.getUserName()?.split(" ")[0]}?
              </Typography>
              <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate("/createProduct")}>
                Adicionar produto
              </Button>
            </Grid>
          )}
        </Card>
      </Grid>
    </>
  );
}
