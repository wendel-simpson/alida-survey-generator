import React from "react";
import { CircularProgress, Box, Button, Typography } from "@mui/material";

const classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    width: "95%",
    border: "2px solid #000",
    borderRadius: "5px",
    backgroundColor: "#eee",
  },
  success: {
    flexDirection: "column",
    fontSize: "30px",
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "center",
    padding: "10px",
  },
  spinnerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "95%",
    border: "2px solid #000",
    borderRadius: "5px",
    backgroundColor: "#eee",
    height: "65vh",
  },
  loadingText: {
    marginLeft: "0px",
    fontSize: "40px",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  button: {
    width: "300px",
    marginTop: "32px",
    height: "40px",
    borderRadius: "5px",
    backgroundColor: "#3f51b5",
    color: "white",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#1a237e",
    },
    "&:disabled": {
      backgroundColor: "#9fa8da",
      color: "#e8eaf6",
    },
  },
};

type Props = {
  isLoading: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
};

export const SuccessPage = (props: Props) => {
  const { isLoading, setIsSuccess } = props;

  if (isLoading) {
    return (
      <Box sx={classes.spinnerContainer}>
        <CircularProgress />
        <Typography sx={classes.loadingText}>
          {" "}
          <Typography sx={{ fontSize: "100px" }}>😅</Typography>
          Loading some JSON...{" "}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={classes.container}>
      <Box sx={classes.success}>
        <Box>Success!</Box>
        <Box
          sx={{ fontSize: "200px", display: "flex", justifyContent: "center" }}
        >
          🎉
        </Box>
        <Box>The json file has been downloaded your machine.</Box>
        <Button
          variant="outlined"
          sx={classes.button}
          onClick={() => setIsSuccess(false)}
        >
          Create another survey
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
