import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import fetch from "node-fetch"; 

const ses = new SESClient({ region: "us-east-1" });

const fetchStockData = async (symbols) => {
  const apiKey = APIKEY; 
  const stockData = {};

  for (const symbol of symbols) {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data["Time Series (1min)"]) {
        const latestTime = Object.keys(data["Time Series (1min)"])[0];
        const latestData = data["Time Series (1min)"][latestTime];
        stockData[symbol] = parseFloat(latestData["1. open"]).toFixed(2);
      } else {
        stockData[symbol] = "Data unavailable";
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      stockData[symbol] = "Error fetching data";
    }
  }

  return stockData;
};

export const handler = async (event) => {
  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch stock data
  const symbols = STOCKTICKERS;
  const stockData = await fetchStockData(symbols);

  const stockMessage = symbols
    .map((symbol) => `${symbol}: $${stockData[symbol]}`)
    .join("\n");

  const emailBody = `This is today's email, sent on ${formattedDate}.\n\nStock Data:\n${stockMessage}`;

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [VERIFIEDRECEPIENTEMAIL],
    },
    Message: {
      Body: {
        Text: { Data: emailBody },
      },
      Subject: { Data: `Daily Email - ${formattedDate}` },
    },
    Source: VERIFIEDSOURCEEMAIL,
  });

  try {
    let response = await ses.send(command);
    return response; 
  } catch (error) {
    console.error("Error sending email:", error); 
    throw error; 
  }
};
