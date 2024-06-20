const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { Parser } = require("json2csv");

const baseCurrency = process.argv[2] || "GBP";

fs.readFile("sample.html", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the HTML file:", err);
    return;
  }

  const $ = cheerio.load(data);

  const currencyPairs = [];
  $("#np-select-548048-listbox li").each((index, element) => {
    const idAttr = $(element).attr("id");
    if (idAttr) {
      const currencyCode = idAttr.split("--")[1];
      if (currencyCode) {
        currencyPairs.push(currencyCode);
      }
    }
  });

  const apiCalls = currencyPairs.map((targetCurrency) => {
    const url = `https://wise.com/rates/live?source=${baseCurrency}&target=${targetCurrency}`;
    return axios
      .get(url)
      .then((response) => ({
        source: baseCurrency,
        target: targetCurrency,
        rate: response.data.value, // Updated to use response.data.value
      }))
      .catch((error) => {
        console.error(`Error fetching rate for ${targetCurrency}:`, error);
        return null;
      });
  });

  try {
    const results = await Promise.all(apiCalls);
    const filteredResults = results.filter((result) => result !== null);
    const json2csvParser = new Parser({ fields: ["source", "target", "rate"] });
    const csv = json2csvParser.parse(filteredResults);

    fs.writeFile("currency_rates.csv", csv, (err) => {
      if (err) {
        console.error("Error writing CSV file:", err);
        return;
      }
      console.log("CSV file has been saved.");
    });
  } catch (error) {
    console.error("Error fetching currency rates:", error);
  }
});
