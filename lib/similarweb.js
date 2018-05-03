const request = require("request-promise");
const url = require("url");
const cheerio = require("cheerio");

const requestOptions = function requestOptions(domain) {
  const { hostname } = url.parse(domain);
  const requestUrl = `https://www.similarweb.com/website/${hostname}`;
  return {
    uri: requestUrl,
    transform: body => cheerio.load(body),
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
    }
  };
};

const getRank = function getRank(domain) {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = await request(requestOptions(domain));
      const rankText = $($(".js-websiteRanksValue")[0]).text();
      console.log(rankText);
      const rank = parseInt(rankText.replace(/ /g, "").replace(/,/g, ""), 10);
      console.log(rank);
      resolve(rank);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  getRank
};
