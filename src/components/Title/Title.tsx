import { Box, Typography } from "@mui/material";
import { LogoAlida } from "../../assets/logo-alida";

const classes = {
  title: {
    fontSize: "32px",
    fontFamily: "Roboto",
    fontWeight: "600",
    paddingLeft: "10px",
    paddingTop: "2px",
  },
};

const Title = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LogoAlida />
      <Typography sx={classes.title}> Survey Generator</Typography>
    </Box>
  );
};

export default Title;
