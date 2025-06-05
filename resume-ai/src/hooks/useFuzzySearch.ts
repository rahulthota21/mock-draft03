import Fuse from "fuse.js";
import { useMemo } from "react";

type Status = "unreviewed" | "shortlisted" | "waitlisted" | "rejected";

export interface FuseCandidate {
  resume_id: string;
  candidate_name: string;
  status: Status;
  total_score: number;
}

export function useFuzzySearch<T extends FuseCandidate>(data: T[], query: string) {
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: ["candidate_name"],
        threshold: 0.3,
      }),
    [data]
  );

  // operator parsing
  if (!query.trim()) return data;

  const opStatus = query.match(/status:(\w+)/i)?.[1] as Status | undefined;
  const opScoreGte = query.match(/score>(\d+)/i)?.[1];
  const cleaned = query
    .replace(/status:\w+/i, "")
    .replace(/score>\d+/i, "")
    .trim();

  let res: T[] = cleaned ? (fuse.search(cleaned) as any).map((r: any) => r.item) : data;

  if (opStatus) res = res.filter((r) => r.status === opStatus);
  if (opScoreGte) res = res.filter((r) => r.total_score >= Number(opScoreGte));

  return res;
}
