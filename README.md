This project now lives in [StockTickerInfo/emailer](https://github.com/aprameyak/StockTickerInfo/tree/main/emailer).

# StockPriceEmailer

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white&style=for-the-badge)
![AWS SES](https://img.shields.io/badge/AWS_SES-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![Amazon EventBridge](https://img.shields.io/badge/Amazon_EventBridge-FF4F8B?logo=amazonaws&logoColor=white&style=for-the-badge)

## About

**StockPriceEmailer** is a serverless automation tool that fetches daily stock prices for a configurable list of tickers and delivers them to your inbox. Built with **Node.js** on **AWS Lambda**, it uses the **Yahoo Finance API** for real-time price data and **AWS SES** for email delivery, with an **EventBridge** schedule triggering the function every 24 hours.

## Features

- Fetches live stock prices for a predefined list of ticker symbols via the Yahoo Finance API
- Sends a formatted daily email through AWS Simple Email Service (SES)
- Serverless execution via AWS Lambda with a Node.js ARM runtime
- Scheduled automatically every 24 hours using AWS EventBridge
- IAM policy scoped to least-privilege access for SES only
- Lambda layer handles Node.js dependency packaging
- Fully configurable ticker list and recipient address

## Technology Stack

- **Runtime**: Node.js
- **Cloud Services**: AWS Lambda, AWS SES, AWS EventBridge, AWS IAM
- **Data Source**: Yahoo Finance API
