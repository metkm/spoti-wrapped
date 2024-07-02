export const readFile = <T>(file: File): Promise<T> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const parsed = JSON.parse(reader.result as string)
      resolve(parsed)
    })

    reader.readAsText(file)
  })
}
