export default async (file: File) => {
  return new Promise<string>(resolve => {
    const fileReader = new FileReader();
    
    fileReader.addEventListener("load", () => {
      resolve(fileReader.result as string);
    })

    fileReader.readAsText(file)
  })
}
