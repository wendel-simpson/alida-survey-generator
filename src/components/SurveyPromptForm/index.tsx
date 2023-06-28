import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config } from "../../types";
import { Typography } from "@mui/material";

const initialValues: Config = {
  inputType: undefined,
  textInput: "",
  companyName: "",
  surveyType: "",
  numberOfQuestions: 10,
  industry: "",
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
      ? schema.required("Required")
      : schema.notRequired()
  ),
  surveyType: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Required")
      : schema.notRequired()
  ),
  industry: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Required")
      : schema.notRequired()
  ),
  numberOfQuestions: Yup.number().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Required")
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
            }}
          >
            <Box display="flex" gap="10px">
              <label>
                <Typography>Method:</Typography>
              </label>
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
                    <input
                      {...field}
                      type="radio"
                      id="quickStart"
                      value="quickStart"
                      checked={field.value === "quickStart"}
                      onChange={field.onChange}
                    />
                    <label htmlFor="quickStart">Quick Start</label>
                    <input
                      {...field}
                      type="radio"
                      id="textInput"
                      value="textInput"
                      checked={field.value === "textInput"}
                      onChange={field.onChange}
                    />
                    <label htmlFor="textInput">Text Input</label>
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
                  <Field as="input" id="companyName" name="companyName" />
                  {errors.companyName && touched.companyName && (
                    <Box>{errors.companyName}</Box>
                  )}
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="surveyType">
                    What is the purpose of the survey?
                  </label>
                  <Field
                    as="textarea"
                    id="surveyType"
                    rows="1"
                    cols="50"
                    name="surveyType"
                  />
                  {errors.surveyType && touched.surveyType && (
                    <Box>{errors.surveyType}</Box>
                  )}
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="industry">
                    What industry is your company in?
                  </label>
                  <Field as="input" id="industry" name="industry" />
                  {errors.industry && touched.industry && (
                    <Box>{errors.industry}</Box>
                  )}
                </Box>
                <Box display="flex" gap="10px">
                  <label htmlFor="numberOfQuestions">
                    How many questions would you like in your survey?
                  </label>
                  <Field
                    type="number"
                    id="numberOfQuestions"
                    name="numberOfQuestions"
                  />
                  {errors.numberOfQuestions && touched.numberOfQuestions && (
                    <Box>{errors.numberOfQuestions}</Box>
                  )}
                </Box>
              </>
            )}
            {values.inputType === "textInput" && (
              <>
                <Box display="flex" gap="10px">
                  <label htmlFor="textInput">
                    Please describe the survey you would like to create:
                  </label>
                  <Field
                    as="textarea"
                    id="textInput"
                    rows="1"
                    cols="50"
                    name="textInput"
                  />
                  {errors.textInput && touched.textInput && (
                    <Box>{errors.textInput}</Box>
                  )}
                </Box>
              </>
            )}
            <Box display="flex" gap="10px">
              {values.inputType && (
                <button type="submit" disabled={Object.keys(errors).length > 0}>
                  Submit
                </button>
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SurveyPromptForm;
