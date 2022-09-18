import type { SxProps } from "@mui/material";

interface IStyles {
  questionsBar: SxProps;
  questionPreview: SxProps;
}

export const styles: IStyles = {
  questionPreview: {
    backgroundColor: "white",
    color: "GrayText",
  },
  questionsBar: {
    width: "10rem",
  },
};
