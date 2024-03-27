const { version } = require("../package.json");
require('dotenv').config()
const metisAndromeda = require("./tokens/metis-andromeda.json");
const metisGoerli = require("./tokens/metis-goerli.json");

const BASE_URL = process.env.NODE_ENV == 'development' ? process.env.BASE_URL_DEV : process.env.BASE_URL;

module.exports = function buildList() {
  const tokens = [];
  if (process.env.NODE_ENV == 'development') {
    tokens.push(...metisGoerli)
  } else {
    tokens.push(...metisAndromeda)
  }
  const processedTokens = JSON.parse(JSON.stringify(tokens).replace(/BASE_URL/g, BASE_URL))
  const parsed = version.split(".");

  return {
    name: "Hercules default token list",
    timestamp: new Date().toISOString(),
    version: { major: +parsed[0], minor: +parsed[1], patch: +parsed[2], },
    tags: {},
    logoURI: "https://app.hercules.exchange/images/logo-sm.svg",
    keywords: ["hercules", "default", "camelot", "dex"],
    tokens: processedTokens
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  }
};
