require("dotenv").config();
const token = process.env.TOKEN;

const api = "https://api.codenation.dev/v1/challenge/dev-ps";
const AlphabeticCharCodeStart = 97;
const AlphabeticCharCodeEnd = 122;
const AlphabethicLength = 26;

const isALetter = c =>
  c.charCodeAt(0) >= AlphabeticCharCodeStart &&
  c.charCodeAt(0) <= AlphabeticCharCodeEnd;

const getSlug = slug => `${api}/${slug}?token=${token}`;

const getDecodedString = response =>
  response.cifrado
    .split("")
    .map(char => {
      if (isALetter(char)) {
        const shouldAdd =
          char.charCodeAt(0) - response.numero_casas < AlphabeticCharCodeStart;
        return String.fromCharCode(
          char.charCodeAt(0) -
            response.numero_casas +
            (shouldAdd ? AlphabethicLength : 0)
        );
      }
      return char;
    })
    .join("");

module.exports = {
  isALetter,
  getSlug,
  getDecodedString,
};
