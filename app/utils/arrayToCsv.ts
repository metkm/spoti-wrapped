export const arrayToCsv = (data: unknown[][]) => {
  const content = data.map(row => row.join(','))
    .join('\r\n')

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const aElement = document.createElement('a')
  aElement.href = url
  aElement.setAttribute('download', 'result')
  aElement.click()
}
