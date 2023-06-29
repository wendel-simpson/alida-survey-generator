import { Box } from "@mui/material";
import Title from "../Title/Title";
import SurveyPromptForm from "../SurveyPromptForm";
import { Typography } from "@mui/material";
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
  },
  success: {
    flexDirection: "column",
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "left",
  },
};

const SurveyGenerator = () => {

  const [showSuccess, setShowSuccess] = useState(false);
  
  return (
    <Box sx={classes.container}>
      <Title />
      
      {showSuccess ? (
        <Typography sx={classes.success}> 
          <SuccessPage />
        </Typography>
        ) :
      <SurveyPromptForm setShowSuccess={setShowSuccess}/>
}
    </Box>
  );
};

export default SurveyGenerator;
