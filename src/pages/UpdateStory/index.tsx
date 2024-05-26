import { Story, EditSnippetDTO, EditStoryDTO } from "@interfaces/index";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@services/api";

export const UpdateStory = () => {
  const [story, setStory] = useState<Story | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.storyService.getStoryById(Number(id)).then(setStory);
  }, [id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (story) {
      setStory({ ...story, name: event.target.value });
    }
  };

  const handleSnippetChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (story) {
      const updatedSnippets = story.snippets.map((snippet, i) =>
        i === index ? { ...snippet, content: event.target.value } : snippet,
      );
      setStory({ ...story, snippets: updatedSnippets });
    }
  };

  const handleSave = async () => {
    if (!story) return;
    console.log(story);

    const editStoryPayload: EditStoryDTO = { storyId: story.id, name: story.name };
    await api.storyService.editStory(editStoryPayload);

    for (const snippet of story.snippets) {
      const editSnippetPayload: EditSnippetDTO = { storyId: story.id, snippetId: snippet.id, snippet: snippet.content };
      await api.storyService.updateSnippet(editSnippetPayload);
    }

    navigate("/");
  };

  if (!story) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid width="60%" display="flex" flexDirection="column" margin="3rem auto">
      <Typography variant="h3">Atualize a história</Typography>
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
          sx={{ scrollBehavior: "auto" }}
        >
          <TextField label="Título" value={story.name} onChange={handleTitleChange} fullWidth />
          <Box width="100%" display="flex" flexDirection="column" gap="1rem">
            {story.snippets.map((snippet, index) => (
              <TextField
                key={snippet.id}
                label={`Trecho - ${index}`}
                value={snippet.content}
                multiline
                rows={4}
                fullWidth
                onChange={handleSnippetChange(index)}
              />
            ))}
          </Box>
        </Grid>
      </Card>
      <Grid marginTop="2rem" display="flex" justifyContent="space-between">
        <Button variant="outlined" color="error" size="large" onClick={() => navigate("/")} sx={{ fontWeight: "bold" }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleSave} sx={{ fontWeight: "bold" }}>
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
};
