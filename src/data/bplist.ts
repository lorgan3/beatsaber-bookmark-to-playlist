import { fetchSongs } from "./bsaber";
import { Song } from "./song";

export interface BpList {
  playlistTitle: string;
  playlistAuthor: string;
  playlistDescription: string;
  image: string;
  customData: Record<string, string>;
  songs: Song[];
}

export const createTitle = (username: string) => `${username}'s bookmarks`;

export const createBpList = async (
  username: string,
  amount?: number
): Promise<BpList> => {
  const title = createTitle(username);
  const songs = await fetchSongs({ bookmarkedBy: username, amount, title });

  if (songs.length === 0) {
    throw new Error("Empty playlist!");
  }

  return {
    playlistTitle: title,
    playlistAuthor: "beatsaber-bookmark-to-playlist",
    playlistDescription: `Playlist automatically generated from ${username}'s bookmarks on ${new Date().toDateString()}`,
    image: generateTextImage(title),
    customData: {},
    songs,
  };
};

const IMAGE_SIZE = 256;
const PADDING = 10;

export const generateTextImage = (text: string, color = "#3498db") => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = IMAGE_SIZE;
  canvas.height = IMAGE_SIZE;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "42px Geist";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";

  let y = 128;
  let height = 0;
  const words = text.split(" ");
  const lines: string[] = [words[0]];
  for (let i = 1; i < words.length; i++) {
    const line = lines[lines.length - 1] + " " + words[i];
    const measurement = ctx.measureText(line);
    if (measurement.width > IMAGE_SIZE - PADDING) {
      lines.push(words[i]);

      height =
        (measurement.actualBoundingBoxAscent +
          measurement.actualBoundingBoxDescent) *
        1.2;
      y -= height;
    } else {
      lines[lines.length - 1] = line;
    }
  }

  for (let line of lines) {
    y += height;

    ctx.fillStyle = "#000";
    ctx.fillText(line, IMAGE_SIZE / 2 + 2, y + 2);

    ctx.fillStyle = "#fff";
    ctx.fillText(line, IMAGE_SIZE / 2, y);
  }

  return canvas.toDataURL();
};
