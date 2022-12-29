export const openFilePicker = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.accept = ".json"
  inputElement.setAttribute("multiple", "multiple");
  inputElement.click();

  return inputElement;
}
