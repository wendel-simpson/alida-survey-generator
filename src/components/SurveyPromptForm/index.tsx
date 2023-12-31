import { Formik, Form, Field, FormikErrors, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config } from "../../types";
import { Radio, Typography, Button } from "@mui/material";
import { useState } from "react";
import * as React from "react";

const host = "10.20.33.86";

const initialValues: Config = {
  inputType: "quickStart",
  textInput: "",
  companyName: "",
  surveyType: "",
  numberOfQuestions: 10,
  industry: "",
  isFileUpload: "no",
  fileUpload: null,
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
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "10px",
    border: "2px solid black",
    borderRadius: "5px",
    padding: "16px 32px",
    backgroundColor: "#eee",
  },
  button: {
    width: "100%",
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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    gap: "10px",
  },
};

const validationSchema = Yup.object({
  inputType: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
  textInput: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "textInput"
      ? schema
          .required("Description Required")
          .max(6000, "Must be less than or equal to 6000 characters")
      : schema.notRequired()
  ),
  companyName: Yup.string().required("Company Name Required"),
  surveyType: Yup.string().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema.required("Survey Type Required")
      : schema.notRequired()
  ),
  industry: Yup.string().required("Industry Required"),
  numberOfQuestions: Yup.number().when("inputType", (inputType, schema) =>
    inputType[0] === "quickStart"
      ? schema
          .required("Number of Questions Required")
          .min(1, "Number of Questions must be at least 1")
          .max(100, "Number of Questions must be at most 100")
      : schema.notRequired()
  ),
  isFileUpload: Yup.string().required("Required"),
  fileUpload: Yup.mixed().when(
    ["inputType", "isFileUpload"],
    (mixedArray, schema) =>
      mixedArray[0] === "textInput" && mixedArray[1] === "yes"
        ? schema.required("File Required")
        : schema.notRequired()
  ),
});

type Props = {
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
};

const SurveyPromptForm = (props: Props) => {
  const { setIsLoading, setIsSuccess } = props;

  const [file, setFile] = useState<File | null>(null);
  const [, setFileName] = useState("");

  const handleSubmit = (values: Config, helpers: FormikHelpers<Config>) => {
    setIsLoading(true);
    const fileName = `${values.companyName}_${values.surveyType}_survey.json`;

    fetch(`http://${host}:5000/generate_survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        helpers.resetForm();
        setIsSuccess(true);
      });
    return true;
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setErrors: (errors: FormikErrors<Config>) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const allowedExtensions = [".txt"];
      const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();

      if (uploadedFile.size > MAX_FILE_SIZE) {
        setErrors({
          fileUpload: "File size exceeds the maximum limit of 5MB.",
        });
        setFile(null);
        setFileName("");
      }

      console.log("fileExtension", fileExtension);

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        setErrors({
          fileUpload: "Only TXT files are allowed currently.",
        });
        setFile(null);
        setFileName("");
      } else {
        setFile(uploadedFile);
        setFileName(uploadedFile.name);

        if (fileExtension === "txt") {
          // Parse the text file and set the text input
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
            setFieldValue("textInput", text, true); // Set the value of "textInput" field
            setFieldValue("fileUpload", uploadedFile, true); // Set the value of "fileUpload" field
          };
          reader.readAsText(uploadedFile);
        }
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        handleSubmit(values, helpers);
      }}
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        setErrors,
        setFieldValue,
        resetForm,
      }) => {
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
                      <Box display="flex" alignItems="center" padding="0 10px">
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
                <Box sx={classes.container}>
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
                        padding="10px"
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
                            placeholder="e.g. Alida"
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
                        padding="10px"
                      >
                        <label htmlFor="industry">
                          2. What industry is your company in?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="industry"
                            name="industry"
                            style={classes.input}
                            placeholder="e.g. Technology"
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
                        padding="10px"
                      >
                        <label htmlFor="surveyType">
                          3. What is the survey type?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="surveyType"
                            name="surveyType"
                            style={classes.input}
                            placeholder="e.g. Customer Satisfaction"
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
                        padding="10px"
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
                            min="1"
                            max="100"
                            placeholder="e.g. 10"
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
                        padding="10px"
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
                            placeholder="e.g. Alida"
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
                        padding="10px"
                      >
                        <label htmlFor="industry">
                          2. What industry is your company in?
                        </label>
                        <Box sx={{ width: "80%" }}>
                          <Field
                            as="input"
                            id="industry"
                            name="industry"
                            style={classes.input}
                            placeholder="e.g. Technology"
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
                        paddingBottom={1}
                      >
                        <Typography sx={{ paddingLeft: "10px" }}>
                          3. Would you like to upload a text file version of
                          your survey?
                        </Typography>
                        <Field name="isFileUpload">
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
                              <Box
                                display="flex"
                                alignItems="center"
                                padding="0 10px"
                              >
                                <Radio
                                  {...field}
                                  id="no"
                                  sx={classes.radio}
                                  value="no"
                                  checked={field.value === "no"}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setFile(null);
                                  }}
                                />
                                <Typography>No</Typography>
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Radio
                                  {...field}
                                  sx={classes.radio}
                                  id="yes"
                                  value="yes"
                                  checked={field.value === "yes"}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setFile(null);
                                  }}
                                />
                                <Typography>Yes</Typography>
                              </Box>
                            </Box>
                          )}
                        </Field>
                      </Box>
                      {values.isFileUpload === "yes" && !file && (
                        <Box
                          display="flex"
                          gap="10px"
                          flexDirection="column"
                          alignItems="flex-start"
                          padding="10px"
                        >
                          <label htmlFor="fileUpload">
                            Please upload .txt file:
                          </label>
                          <Box>
                            <label htmlFor="fileUpload">
                              <input
                                type="file"
                                id="fileUpload"
                                name="fileUpload"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                  handleFileUpload(e, setErrors, setFieldValue)
                                }
                              />
                              <Button
                                sx={classes.button}
                                variant="contained"
                                component="span"
                              >
                                Upload File
                              </Button>
                            </label>
                          </Box>
                        </Box>
                      )}
                      {values.isFileUpload === "yes" &&
                        [
                          "Only Word documents or TXT files are allowed.",
                          "Only TXT files are allowed currently.",
                          "File size exceeds the maximum limit of 5MB.",
                        ].includes(errors.fileUpload ?? "") && (
                          <Box sx={classes.error}>{errors.fileUpload}</Box>
                        )}
                    </>
                  )}
                  {(values.isFileUpload === "no" ||
                    (values.isFileUpload === "yes" &&
                      values.textInput !== "")) &&
                    values.inputType === "textInput" && (
                      <Box
                        display="flex"
                        gap="10px"
                        flexDirection="column"
                        alignItems="flex-start"
                        padding="10px"
                      >
                        <label htmlFor="textInput">
                          4. Please describe the survey you would like to
                          create:
                        </label>
                        <Box style={{ width: "95%" }}>
                          <Field
                            as="textarea"
                            id="textInput"
                            name="textInput"
                            style={classes.textArea}
                            placeholder={`Enter survey description...\n\nCan be:\n- A detailed description of the survey you want to create\n- A text version of the survey you want to convert to an Alida survey`}
                          />
                          {errors.textInput && touched.textInput && (
                            <Box sx={classes.error}>{errors.textInput}</Box>
                          )}
                        </Box>
                      </Box>
                    )}
                  <Box display="flex" justifyContent="flex-end" gap="10px">
                    {values.inputType && (
                      <Button
                        sx={classes.button}
                        type="submit"
                        variant="outlined"
                        disabled={Object.keys(errors).length > 0}
                        onClick={() => {}}
                      >
                        Generate Survey
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
