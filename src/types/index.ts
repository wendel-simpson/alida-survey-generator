export type Config = {
  /**
   * Could be a textArea or a fileUpload option
   */
  inputType: "quickStart" | "textInput";
  textInput?: string;
  companyName?: string;
  surveyType?: string;
  numberOfQuestions?: number;
  industry?: string;
  isFileUpload: "no" | "yes";
  fileUpload?: File | null;
};
