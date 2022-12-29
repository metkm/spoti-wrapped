export const openFilePicker = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.setAttribute("multiple", "multiple");
  inputElement.click();

  return inputElement;
}
