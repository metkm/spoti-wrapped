import { WrappedResult, Song } from "~~/models/Song";
import { Jobs } from "./models/Worker";

onmessage = async (event: MessageEvent<Jobs>) => {
  switch (event.data.job) {
    case "parseFiles":
      let parsedContents: Song[] = [];

      for (const file of event.data.args as FileList) {
        let result = await readFile(file);
        let parsed: Song[] = JSON.parse(result);

        parsedContents.push(...parsed);
      }

      break;
    default:
      break;
  }
}
