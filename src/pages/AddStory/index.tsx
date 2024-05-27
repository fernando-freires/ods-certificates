import { useState } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StoryDTO } from "@interfaces/index";
import api from "@services/api";

export const AddStory = () => {
  const [story, setStory] = useState<StoryDTO>({ name: "", firstSnippet: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStory(prevStory => ({ ...prevStory, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.storyService.createStory(story);
      navigate("/");
    } catch (error) {
      console.error("Failed to create story:", error);
    }
  };

  return (
    <Grid width="60%" height="80vh" display="flex" flexDirection="column" margin="3rem auto">
      <Typography variant="h3">Adicione uma nova história</Typography>
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
          <TextField size="small" name="name" label="Título" fullWidth value={story.name} onChange={handleChange} />
          <Box width="100%">
            <TextField
              size="small"
              name="firstSnippet"
              multiline
              rows={4}
              label="Primeiro trecho"
              fullWidth
              value={story.firstSnippet}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Card>
      <Grid marginTop="2rem" display="flex" justifyContent="space-between">
        <Button variant="outlined" color="error" size="large" onClick={() => navigate("/")} sx={{ fontWeight: "bold" }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit} sx={{ fontWeight: "bold" }}>
          Adicionar história
        </Button>
      </Grid>
    </Grid>
  );
};
