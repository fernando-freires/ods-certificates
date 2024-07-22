export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
}

export interface IInitialRegistration {
  name: string;
  email: string;
  cpf: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IGetUser extends IInitialRegistration {
  id: number;
  password: string;
}

export interface StoryDTO {
  name: string;
  firstSnippet: string;
}

interface Snippet {
  id: number;
  content: string;
}

export interface Story {
  id: number;
  name: string;
  snippets: Snippet[];
}

export interface EditStoryDTO {
  storyId: number;
  name: string;
}

export interface SnippetDTO {
  storyId: number;
  snippet: string;
}

export interface EditSnippetDTO {
  storyId: number;
  snippetId: number;
  snippet: string;
}
