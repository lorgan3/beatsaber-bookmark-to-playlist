import camelcaseKeys from "camelcase-keys";
import { Song } from "./song";

export interface Params {
  bookmarkedBy: string;
  amount?: number;
}

const BSABER_API_URL = "https://bsaber.com/wp-json/bsaber-api/songs";
const PROXY_URL = "https://corsproxy.io/";

const MAX_RETRIES = 3;

export const fetchSongs = async ({ bookmarkedBy, amount }: Params) => {
  const url = new URL(BSABER_API_URL);
  url.searchParams.set("bookmarked_by", bookmarkedBy);

  const songs: Song[] = [];

  let page = 1;
  let retries = 0;
  while (!amount || songs.length < amount) {
    url.searchParams.set("page", page.toString());

    let response;
    try {
      response = await fetch(
        `${PROXY_URL}?${encodeURIComponent(url.toString())}`
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      retries++;
      if (retries < MAX_RETRIES) {
        continue;
      }

      throw new Error("Failed to fetch bookmarks", { cause: error });
    }

    const json = camelcaseKeys(await response.json()) as {
      songs: Song[];
      nextPage: number | null;
    };

    songs.push(...json.songs);

    if (!json.nextPage) {
      break;
    }
    page++;
  }

  return songs;
};
