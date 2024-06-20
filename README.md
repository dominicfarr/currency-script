# Currency Rates Fetcher

This project fetches live currency exchange rates from Wise (formerly TransferWise) for a given base currency against multiple target currencies. The results are saved into a CSV file.

## Prerequisites

- Node.js (v14 or later)

## Installation

1. **Clone the repository or download the project files:**

   ```sh
   git clone <repository_url>
   cd currency-rates-project
   ```

2. **Install the required npm packages:**
   npm install

**Usage**

Running the Script

The script can be run with an optional base currency parameter. If no base currency is provided, it defaults to GBP.

Default Base Currency (GBP)
`node fetchCurrencyRates.js`

Specifying a Base Currency (e.g., EUR)
`node fetchCurrencyRates.js EUR`

**Output**

The script will generate a CSV file named currency_rates.csv in the project directory. This file contains the exchange rates of the specified base currency against the target currencies listed in the provided sample.html.

Project Structure

    •	fetchCurrencyRates.js: The main script that fetches the currency rates and saves them to a CSV file.
    •	sample.html: The HTML file containing the list of target currencies.
    •	package.json: The npm package configuration file.
    •	README.md: This file.

Dependencies

    •	axios: For making HTTP requests to the Wise API.
    •	cheerio: For parsing the HTML file and extracting currency pairs.
    •	json2csv: For converting JSON data to CSV format.

Example

Given the sample.html contains a list of target currencies, running the script will call the Wise API for each currency pair and save the exchange rates in currency_rates.csv.

**Sample CSV Output**

```[csv]
source,target,rate
GBP,USD,1.38
GBP,EUR,1.16
GBP,JPY,150.23
...
```
