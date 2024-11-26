import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import yahooFinance from "yahoo-finance2";

const ses = new SESClient({ region: "us-east-1" });

const fetchStockData = async (symbols) => {
  const stockData = {};

  for (const symbol of symbols) {
    try {
      const quote = await yahooFinance.quote(symbol);

      if (quote && quote.regularMarketPrice !== undefined) {
        stockData[symbol] = quote.regularMarketPrice.toFixed(2);
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
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const symbols = ["IBM", "AAPL", "MSFT", "TSLA", "VOO", "VTI", "QQQ", "SPY"];
  
  const stockData = await fetchStockData(symbols);

  const stockMessage = symbols
    .map((symbol) => `${symbol}: $${stockData[symbol]}`)
    .join("\n");

  const emailBody = `This is today's email, sent on ${formattedDate}\n\nStock Data:\n${stockMessage}`;

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["aprameyakannan@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: emailBody },
      },
      Subject: { Data: `Daily Email - ${formattedDate}` },
    },
    Source: "aprameya557@gmail.com",
  });

  try {
    const response = await ses.send(command);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
