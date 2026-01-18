export function extractVideoId(url) {
  try {
    const u = new URL(url);

    // Case 1: https://www.youtube.com/watch?v=VIDEO_ID
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }

    // Case 2: https://youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }

    // Case 3: https://www.youtube.com/embed/VIDEO_ID
    if (u.pathname.startsWith("/embed/")) {
      return u.pathname.split("/embed/")[1];
    }

    // Case 4: https://www.youtube.com/shorts/VIDEO_ID
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/shorts/")[1];
    }

    return null;
  } catch {
    return null;
  }
}