import { Box } from "@mui/material";
import Title from "../Title/Title";
import SurveyPromptForm from "../SurveyPromptForm";
import SuccessPage from "./SuccessPage";
import { useState } from "react";

const classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    minWidth: 500,
    height: "100%",
  },
};

const SurveyGenerator = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box sx={classes.container}>
      <Title />

      {isLoading || isSuccess ? (
        <SuccessPage isLoading={isLoading} setIsSuccess={setIsSuccess} />
      ) : (
        <SurveyPromptForm
          setIsLoading={setIsLoading}
          setIsSuccess={setIsSuccess}
        />
      )}
    </Box>
  );
};

export default SurveyGenerator;
