import type { Story } from "./types";

export async function getTopStoryIds(): Promise<number[]> {
  const url = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to get id: ${response.status}`);
  }

  const ids: unknown = await response.json();

  if (!Array.isArray(ids)) {
    throw new Error(`Failed to get array id`);
  }

  const verifiedData = ids.every((id) => typeof id === "number");

  if (!verifiedData) {
    throw new Error(`The ID is not valid, please try again.`);
  }

  return ids.slice(0, 10);
}

export async function getStory(id: number): Promise<Story> {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to get story: ${response.status}`);
  }

  const story: unknown = await response.json();

  if (typeof story !== "object" || story === null) {
    throw new Error(`The requested data is not valid, please try again.`);
  }

  if (!("id" in story) || typeof story.id !== "number") {
    throw new Error("Invalid story id");
  }

  if (!("score" in story) || typeof story.score !== "number") {
    throw new Error("Invalid story score");
  }

  if (!("title" in story) || typeof story.title !== "string") {
    throw new Error("Invalid story title");
  }

  if (!("by" in story) || typeof story.by !== "string") {
    throw new Error("Invalid story by");
  }

  const result: Story = {
    id: story.id,
    score: story.score,
    title: story.title,
    by: story.by,
  };

  if ("url" in story) {
    if (typeof story.url !== "string") {
      throw new Error("Invalid story url");
    }

    result.url = story.url;
  }

  return result;
}

export async function getTopStories(): Promise<Story[]> {
  const ids = await getTopStoryIds();

  const requests = ids.map((id) => {
    return getStory(id);
  });

  const results = await Promise.all(requests);

  return results;
}
