import { Box } from "@mui/material";
import Title from "../Title/Title";
import SurveyPromptForm from "../SurveyPromptForm";

const classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 40px",
    width: "100%",
  },
};

const SurveyGenerator = () => {
  return (
    <Box sx={classes.container}>
      <Title />
      <SurveyPromptForm />
    </Box>
  );
};

export default SurveyGenerator;
