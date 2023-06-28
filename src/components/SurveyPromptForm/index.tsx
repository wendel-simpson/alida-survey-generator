import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config } from "../../types";
import { Button, Radio, Typography } from "@mui/material";

const initialValues: Config = {
  inputType: undefined,
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
    color: "red",
    textAlign: "left",
    paddingTop: "5px",
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
};

const validationSchema = Yup.object({
  inputType: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
  textInput: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "textInput"
      ? schema.required("Required")
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
            <Box display="flex" gap="10px" alignItems="center">
              <Typography>Generator Method</Typography>
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
                  <>
                    <Box display="flex" alignItems="center">
                      <Radio
                        {...field}
                        id="quickStart"
                        sx={classes.radio}
                        value="quickStart"
                        checked={field.value === "quickStart"}
                        onChange={field.onChange}
                      />
                      <Typography>Quick Start</Typography>
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
                      <Typography>Text Input</Typography>
                    </Box>
                  </>
                )}
              </Field>
            </Box>
            {values.inputType === "quickStart" && (
              <>
                <Box display="flex" gap="10px">
                  <label htmlFor="companyName">
                    What is the name of your company?
                  </label>
                  <Box>
                    <Field as="input" id="companyName" name="companyName" />
                    {errors.companyName && touched.companyName && (
                      <Box sx={classes.error}>{errors.companyName}</Box>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="surveyType">
                    What is the purpose of the survey?
                  </label>
                  <Box>
                    <Field
                      as="textarea"
                      id="surveyType"
                      rows="3"
                      cols="30"
                      name="surveyType"
                    />
                    {errors.surveyType && touched.surveyType && (
                      <Box sx={classes.error}>{errors.surveyType}</Box>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="industry">
                    What industry is your company in?
                  </label>
                  <Box>
                    <Field as="input" id="industry" name="industry" />
                    {errors.industry && touched.industry && (
                      <Box sx={classes.error}>{errors.industry}</Box>
                    )}
                  </Box>
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="numberOfQuestions">
                    How many questions would you like in your survey?
                  </label>
                  <Box>
                    <Field
                      type="number"
                      id="numberOfQuestions"
                      name="numberOfQuestions"
                    />
                    {errors.numberOfQuestions && touched.numberOfQuestions && (
                      <Box sx={classes.error}>{errors.numberOfQuestions}</Box>
                    )}
                  </Box>
                </Box>
              </>
            )}
            {values.inputType === "textInput" && (
              <>
                <Box display="flex" gap="10px">
                  <label htmlFor="textInput">
                    Please describe the survey you would like to create:
                  </label>
                  <Box>
                    <Field
                      as="textarea"
                      id="textInput"
                      rows="10"
                      cols="50"
                      name="textInput"
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default SurveyPromptForm;
