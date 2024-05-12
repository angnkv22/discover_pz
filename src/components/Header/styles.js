import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  title: {
    fontSize: "2rem",
    fontFamily: "Merriweather",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.12)",
    color: "#036baa",
    marginLeft: "10px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
  },
  searchIcon: {
    padding: theme.spacing(0, 2), height: "100%", position: "absolute", pointerEvents: "none",
    display: "flex", alignItems: "center", justifyContent: "center", color:"#036baa",
  },
  logo:{
    width: 70,
    height: 70,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"), width: "100%", [theme.breakpoints.up("md")]: { width: "20ch" },
    fontFamily: "Merriweather", color:"#036baa",
  },
  toolbar: {
    display: "flex", justifyContent: "space-between", fontFamily: "Merriweather", color:"#036baa",
  },
}));
