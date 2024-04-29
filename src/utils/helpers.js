export function generateRandomString(n) {
  var chars = "abcdefghijkmnopqrstuvwxyz";
  var result = "";
  for (var i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateSlug(title) {
  const formattedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .join("-");
  const randomString = generateRandomString(8);
  return `${formattedTitle}-${randomString}`;
}

export const parsedTags = (tags) => {
  const parsedTags = JSON.parse(tags);
  parsedTags.forEach((tag) => {
    if (tag.hasOwnProperty("__isNew__")) {
      delete tag["__isNew__"];
    }
  });
  return parsedTags;
};
