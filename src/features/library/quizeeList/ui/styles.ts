import { SxProps } from "@mui/material";
interface IStyles {
  container: SxProps;
  img: SxProps;
  mainInfo: SxProps;
  actions: SxProps;
}
export const styles: IStyles = {
  container: {
    padding: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxHeight: "130px",
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  img: {},
  mainInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "60%",
  },
  actions: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "end",
  },
};
