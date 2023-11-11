import camelcaseKeys from "camelcase-keys";
import { Song } from "./song";

export interface Params {
  bookmarkedBy: string;
  amount?: number;
}

const BSABER_API_URL = "https://bsaber.com/wp-json/bsaber-api/songs";
const PROXY_URL = "https://corsproxy.io/";

export const fetchSongs = async ({ bookmarkedBy, amount }: Params) => {
  const url = new URL(BSABER_API_URL);
  url.searchParams.set("bookmarked_by", bookmarkedBy);

  const songs: Song[] = [];

  let page = 1;
  while (!amount || songs.length < amount) {
    url.searchParams.set("page", page.toString());

    const response = await fetch(`${PROXY_URL}?${url.toString()}`);
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
