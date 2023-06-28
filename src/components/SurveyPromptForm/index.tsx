import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config } from "../../types";
import { Button, Radio, Typography } from "@mui/material";

const initialValues: Config = {
  inputType: "quickStart",
  textInput: "",
  companyName: "",
  surveyType: "",
  numberOfQuestions: 10,
  industry: "",
};

const classes = {
  error: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "#E55940",
    textAlign: "left",
    paddingTop: "5px",
  },
  input: {
    width: "100%",
    borderRadius: "4px",
    height: "24px",
    padding: "4px 8px",
    fontFamily: "Roboto",
    fontSize: "16px",
  },
  textArea: {
    width: "100%",
    borderRadius: "4px",
    height: "200px",
    padding: "4px 8px",
    fontFamily: "Roboto",
    fontSize: "16px",
  },
  title: {
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "left",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "10px",
  },

  button: {
    width: "100px",
    marginTop: "10px",
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
  radio: {
    "&.Mui-checked": {
      color: "#E55940",
    },
  },
  surveyOptionsContainer: {
    border: "2px solid black",
    borderRadius: "5px",
    padding: "16px",
    backgroundColor: "#eee",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "10px",
  },
};

const validationSchema = Yup.object({
  inputType: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
  textInput: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "textInput"
      ? schema.required("Description Required")
      : schema.notRequired()
  ),
  companyName: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Company Name Required")
      : schema.notRequired()
  ),
  surveyType: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Survey Type Required (e.g. Employee Engagement)")
      : schema.notRequired()
  ),
  industry: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Industry Required (e.g. Technology)")
      : schema.notRequired()
  ),
  numberOfQuestions: Yup.number().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Number of Questions Required")
      : schema.notRequired()
  ),
});

const SurveyPromptForm = () => {
  const handleSubmit = (values: Config) => {
    switch (values.inputType) {
      case "textInput":
        // Deal with the text input variation call to backend
        // Go to the next page with the survey json
        break;

      default:
        // Deal with the quick start variation call to backend
        // Go to the next page with the survey json
        console.log("values to send to the BE", values);
        break;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, values, handleChange }) => {
        console.log("errors", errors, "values", values);

        return (
          <Box sx={classes.form}>
            <Form
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                paddingTop: "20px",
              }}
            >
              <Box
                display="flex"
                gap="10px"
                flexDirection="column"
                alignItems="flex-start"
                paddingBottom={1}
              >
                <Typography sx={classes.title}>
                  Choose your generator method
                </Typography>
                <Field name="inputType">
                  {({
                    field,
                  }: {
                    field: {
                      value: string;
                      onChange: (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => void;
                    };
                  }) => (
                    <Box display="flex">
                      <Box display="flex" alignItems="center">
                        <Radio
                          {...field}
                          id="quickStart"
                          sx={classes.radio}
                          value="quickStart"
                          checked={field.value === "quickStart"}
                          onChange={field.onChange}
                        />
                        <Typography onClick={() => handleChange("quickStart")}>
                          Quick Start
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Radio
                          {...field}
                          sx={classes.radio}
                          id="textInput"
                          value="textInput"
                          checked={field.value === "textInput"}
                          onChange={field.onChange}
                        />
                        <Typography onClick={() => handleChange("textInput")}>
                          Text Input
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Field>
              </Box>
              {values.inputType && (
                <Box sx={classes.surveyOptionsContainer}>
                  {values.inputType === "quickStart" && (
                    <>
                      <Typography
                        sx={{ ...classes.title, paddingBottom: "10px" }}
                      >
                        Survey Description
                      </Typography>
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <label htmlFor="companyName">
                          1. What is the name of your company?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="companyName"
                            name="companyName"
                            style={classes.input}
                          />
                          {errors.companyName && touched.companyName && (
                            <Box sx={classes.error}>{errors.companyName}</Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <label htmlFor="surveyType">
                          2. What is the purpose of the survey?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="surveyType"
                            name="surveyType"
                            style={classes.input}
                          />
                          {errors.surveyType && touched.surveyType && (
                            <Box sx={classes.error}>{errors.surveyType}</Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <label htmlFor="industry">
                          3. What industry is your company in?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="industry"
                            name="industry"
                            style={classes.input}
                          />
                          {errors.industry && touched.industry && (
                            <Box sx={classes.error}>{errors.industry}</Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <label htmlFor="numberOfQuestions">
                          4. How many questions would you like in your survey?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            type="number"
                            id="numberOfQuestions"
                            name="numberOfQuestions"
                            style={classes.input}
                          />
                          {errors.numberOfQuestions &&
                            touched.numberOfQuestions && (
                              <Box sx={classes.error}>
                                {errors.numberOfQuestions}
                              </Box>
                            )}
                        </Box>
                      </Box>
                    </>
                  )}
                  {values.inputType === "textInput" && (
                    <>
                      <Typography
                        sx={{ ...classes.title, paddingBottom: "10px" }}
                      >
                        Survey Description
                      </Typography>
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <label htmlFor="textInput">
                          Please describe the survey you would like to create:
                        </label>
                        <Box style={{ width: "95%" }}>
                          <Field
                            as="textarea"
                            id="textInput"
                            name="textInput"
                            style={classes.textArea}
                          />
                          {errors.textInput && touched.textInput && (
                            <Box sx={classes.error}>{errors.textInput}</Box>
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                  <Box display="flex" justifyContent="flex-end" gap="10px">
                    {values.inputType && (
                      <Button
                        sx={classes.button}
                        type="submit"
                        variant="outlined"
                        disabled={Object.keys(errors).length > 0}
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

export default SurveyPromptForm;
