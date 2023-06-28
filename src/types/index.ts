export type Config = {
  /**
   * The openAi prefix prompt
   */
  prompt: string;
  /**
   * Could be a textArea or a fileUpload option
   */
  inputType: "file" | "text";
  textInput?: string;
  fileInput?: File;
};
