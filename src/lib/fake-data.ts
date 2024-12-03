import { faker } from "@faker-js/faker";

export interface Candidate {
  id: string;
  name: string;
  votes: number;
}

export function generateFakeUsers(): number {
  return faker.number.int({ min: 10000, max: 1000000 });
}

export function generateFakeVotes(): number {
  return faker.number.int({ min: 5000, max: 500000 });
}

export function generateFakeCandidates(count: number): Candidate[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    votes: faker.number.int({ min: 1000, max: 100000 }),
  }));
}
