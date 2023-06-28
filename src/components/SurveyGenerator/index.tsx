import { Box } from "@mui/material";
import Title from "../Title/Title";
import SurveyPromptForm from "../SurverPromptForm";

const classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
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
