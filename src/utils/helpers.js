export function generateRandomString() {
  var chars = "abcdefghijkmnopqrstuvwxyz";
  var result = "";
  for (var i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
