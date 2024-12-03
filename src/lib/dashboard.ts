import {
  generateFakeUsers,
  generateFakeVotes,
  generateFakeCandidates,
  Candidate,
} from "./fake-data";

export async function fetchTotalUsers(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateFakeUsers();
}

export async function fetchTotalVotes(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateFakeVotes();
}

export async function fetchCandidates(): Promise<Candidate[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateFakeCandidates(5);
}
