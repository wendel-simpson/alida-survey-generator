import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config } from "../../types";
import { Typography } from "@mui/material";

const initialValues: Config = {
  prompt: "",
  inputType: "text",
  textInput: "",
  fileInput: undefined,
};

const validationSchema = Yup.object({
  prompt: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
  isTextInput: Yup.boolean().required("Required"),
  textInput: Yup.string().when("isTextInput", (isTextInput, schema) =>
    isTextInput ? schema.required("Required") : schema.notRequired()
  ),
  fileInput: Yup.mixed().when("isTextInput", (isTextInput, schema) =>
    !isTextInput ? schema.required("Required") : schema.notRequired()
  ),
});

const SurveyPromptForm = () => {
  const handleSubmit = (values: Config) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, values, handleChange }) => {
        console.log(values);

        return (
          <Form
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box display="flex" gap="10px">
              <label htmlFor="prompt">Open AI Prompt</label>
              <Field
                as="textarea"
                rows="1"
                cols="50"
                id="prompt"
                name="prompt"
              />
              {errors.prompt && touched.prompt && <Box>{errors.prompt}</Box>}
            </Box>
            <Box display="flex" gap="10px">
              <label>
                <Typography>Input Type</Typography>
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
                      id="textInput"
                      value="text"
                      checked={field.value === "text"}
                      onChange={field.onChange}
                    />
                    <label htmlFor="textInput">Text Entry</label>
                    <input
                      {...field}
                      type="radio"
                      id="fileInput"
                      value="file"
                      checked={field.value === "file"}
                      onChange={field.onChange}
                    />
                    <label htmlFor="fileInput">File Upload</label>
                  </>
                )}
              </Field>
            </Box>
            <Box display="flex" gap="10px">
              {values.inputType === "text" && (
                <>
                  <label htmlFor="textInput">
                    Describe the survey you want to create
                  </label>
                  <Field
                    as="textarea"
                    rows="1"
                    cols="50"
                    id="textInput"
                    name="textInput"
                  />
                  {errors.textInput && touched.textInput && (
                    <Box>{errors.textInput}</Box>
                  )}
                </>
              )}
            </Box>
            <Box display="flex" gap="10px">
              {values.inputType === "file" && (
                <div>
                  <label htmlFor="fileInput">
                    Describe the survey you want to create
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        handleChange({
                          target: {
                            name: "fileInput",
                            value: file,
                          },
                        });
                      }
                    }}
                  />
                  {errors.fileInput && touched.fileInput && (
                    <Box>{errors.fileInput}</Box>
                  )}
                </div>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <button type="submit">Submit</button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SurveyPromptForm;
