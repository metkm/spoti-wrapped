export const readFile = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      resolve(fileReader.result as string);
    })

    fileReader.readAsText(file);
  })
}
