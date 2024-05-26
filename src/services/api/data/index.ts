import { EditSnippetDTO, EditStoryDTO, SnippetDTO, Story, StoryDTO } from "@interfaces/index";
import axios from "axios";

const axiosClient = axios.create({ baseURL: "http://127.0.0.1:8080/story" });

// Stories
export const createStory = async (payload: StoryDTO) => {
  return await axiosClient.post("/createStory", payload);
};

export const getAllStories = async (): Promise<Story[]> => {
  return await axiosClient.get("/stories");
};

export const getStoryById = async (id: number): Promise<Story> => {
  return await axiosClient.get(`/id/${id}`);
};

export const editStory = async (payload: EditStoryDTO) => {
  return await axiosClient.put("/editStory", payload);
};

export const deleteStory = async (id: number) => {
  return await axiosClient.delete(`/deleteStory/${id}`);
};

// Snippets
export const createSnippet = async (payload: SnippetDTO) => {
  return await axiosClient.post("/addSnippet", payload);
};

export const updateSnippet = async (payload: EditSnippetDTO) => {
  return await axiosClient.put("/editSnippet", payload);
};
