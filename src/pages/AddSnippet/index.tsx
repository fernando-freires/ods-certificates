import { SnippetDTO } from "@interfaces/index";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import api from "@services/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AddSnippet = () => {
  const [snippet, setSnippet] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnippet(e.target.value);
  };

  const handleSubmit = async () => {
    const payload: SnippetDTO = { storyId: Number(id), snippet };
    try {
      await api.storyService.createSnippet(payload);
      navigate("/");
    } catch (error) {
      console.error("Failed to add snippet:", error);
    }
  };

  return (
    <Grid width="60%" height="80vh" display="flex" flexDirection="column" margin="3rem auto">
      <Typography variant="h3">Adicione seu trecho à história</Typography>
      <Card
        variant="elevation"
        sx={{
          marginTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="1.5rem"
          marginTop="1rem"
          padding="0 2em"
        >
          <Box width="100%">
            <TextField label="Novo trecho" multiline rows={4} fullWidth value={snippet} onChange={handleChange} />
          </Box>
        </Grid>
      </Card>
      <Grid marginTop="2rem" display="flex" justifyContent="space-between">
        <Button variant="outlined" color="error" size="large" onClick={() => navigate("/")} sx={{ fontWeight: "bold" }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit} sx={{ fontWeight: "bold" }}>
          Adicionar trecho
        </Button>
      </Grid>
    </Grid>
  );
};
