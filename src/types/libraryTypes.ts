export type quizeeType = "my" | "fav";

export interface ILibrary {
  searchQuery: string;
  filterValue: quizeeType;
}
