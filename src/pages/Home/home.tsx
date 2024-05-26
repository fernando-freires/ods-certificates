import { Story } from "@interfaces/index";
import { Button, Card, Grid, Typography } from "@mui/material";
import api from "@services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [stories, setStories] = useState<Story[]>();
  const navigate = useNavigate();

  useEffect(() => {
    // api.storyService.getAllStories().then(setStories);
    // Remover esse setStories mockado e descomentar o código acima
    setStories([
      {
        id: 0,
        name: "Era uma vez um gay",
        snippets: [
          { id: 0, content: "O nome dele era Fernando" },
          { id: 1, content: "Ele tinha um amigo chamado Thiago" },
        ],
      },
      {
        id: 1,
        name: "Outra história",
        snippets: [
          { id: 0, content: "Era uma vez em uma terra distante" },
          { id: 1, content: "Havia um castelo muito grande" },
        ],
      },
    ]);
  }, []);

  const handleLogout = async () => {
    if (api.login.logout()) {
      return navigate("/login");
    }
  };

  const deleteStory = async (id: number) => {
    // Remover esse codigo e descomentar o código abaixo desse console.log
    console.log(`id a ser deletado: ${id}`);

    // if ((await api.storyService.deleteStory(id)).data) {
    //   return navigate("/");
    // }
  };

  if (!stories) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid width="70%" height="80vh" display="flex" flexDirection="column" margin="3rem auto">
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Histórias</Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/addStory")}
            sx={{ fontWeight: "bold" }}
          >
            Adicionar história
          </Button>
          <Button variant="contained" color="error" size="large" onClick={handleLogout} sx={{ fontWeight: "bold" }}>
            Sair
          </Button>
        </div>
      </Grid>
      {stories &&
        stories.map(story => (
          <Grid marginTop="1.5rem" key={story.id}>
            <Grid
              display="flex"
              alignItems="center"
              padding="0 2rem"
              justifyContent="space-between"
              borderRadius="10px 10px 0px 0"
              sx={{ backgroundColor: "lightblue" }}
            >
              <Typography variant="h4">{story.name}</Typography>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  onClick={() => navigate(`/${story.id}/updateStory`)}
                  sx={{ fontWeight: "bold", height: "60%" }}
                >
                  Editar história
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteStory(story.id)}
                  sx={{ fontWeight: "bold", height: "60%" }}
                >
                  Excluir história
                </Button>
              </div>
            </Grid>
            <Card
              variant="elevation"
              elevation={0}
              sx={{
                minHeight: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                paddingTop: "1.25rem",
                ":hover": { backgroundColor: "#90dde718", cursor: "pointer" },
              }}
              onClick={() => navigate(`/${story.id}/addSnippet`)}
            >
              <Typography textAlign="justify" variant="body1" padding="0 2rem 1.5rem 2rem">
                {story.snippets.map(snippet => snippet.content).join(" ")}
              </Typography>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
