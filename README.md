# StockPriceEmailer

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?logo=amazon-aws&logoColor=white&style=for-the-badge)
![AWS SES](https://img.shields.io/badge/AWS%20SES-005EB8?logo=amazon-aws&logoColor=white&style=for-the-badge)
![EventBridge](https://img.shields.io/badge/AWS%20EventBridge-0073E6?logo=amazon-aws&logoColor=white&style=for-the-badge)

## About

This project provides the functionality of sending a **daily email of stock prices** for specified tickers using a serverless architecture powered by AWS services.

<img width="353" height="350" alt="Screenshot 2025-07-28 at 9 47 23 AM" src="https://github.com/user-attachments/assets/010eb74b-737e-499d-acd4-152c7ece0036" />

## Components

- **Node.js Script**: Uses `SESClient` to send an email using AWS Simple Email Service (SES). Fetches stock data via the Yahoo Finance API based on predefined tickers.

- **AWS Lambda Function**: Executes the script using a Node.js runtime (ARM architecture) and includes a Lambda layer for dependencies. It assumes an execution role with permission to access AWS SES.

- **AWS IAM Policy**: Follows the principle of least privilege and is attached to the Lambda execution role to allow access to AWS SES.

- **AWS SES**: Handles verified email sending and receiving. Sends the stock data to a personal email from a registered sender address.

- **AWS EventBridge Schedule**: Triggers the Lambda function every 24 hours to fetch and email stock prices on a recurring basis.

## Tech Stack

- **Backend**: Node.js, Yahoo Finance API  
- **Cloud Services**: AWS Lambda, AWS IAM, AWS SES, AWS EventBridge
