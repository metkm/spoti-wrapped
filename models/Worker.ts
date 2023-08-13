export type Job = "parseResults" | "parseFiles";

type Args = {
  "parseResults": any[],
  "parseFiles": FileList
}

export interface Jobs {
  job: Job,
  args: Args[Job],
  contents?: string
}
