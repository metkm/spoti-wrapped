type Types = {
  "files": string[]
}

interface Events {
  type: keyof Types,
  data: Types[]
}

onmessage = ({ data: { data, type } }: MessageEvent<Events>) => {
  if (type === "files") {
    for (const file of data) {
      console.log(file);
    }
  }
}
