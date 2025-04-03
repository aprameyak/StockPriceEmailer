# **StockPriceEmailer**

This project provides the functionality of sending me a daily email of stock prices of given tickers. Below are the components of the system:

![Node Badge](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![AWS Badge](https://img.shields.io/badge/AWS-Lambda-FF9900)
![SES Badge](https://img.shields.io/badge/AWS-SES-blue)
![EventBridge Badge](https://img.shields.io/badge/AWS-EventBridge-0073E6)

## Components

- **Node.js Script**: The Node.js script uses `SESClient` to send an email using AWS Simple Email Service. It fetches stock data via the Yahoo Finance API based on the tickers specified in the script.

- **AWS Lambda Function**: The AWS Lambda function has an execution role granting it permission to call the AWS Simple Email Service API. It includes a Lambda layer containing Node.js package dependencies, and the script is executed using a Node.js runtime for ARM architecture.

- **AWS IAM Policy**: The AWS Identity and Access Management policy follows the principle of least privilege and is attached to the IAM role that allows the AWS Lambda function to invoke the AWS SES API.

- **AWS SES**: AWS Simple Email Service (SES) is used to register and verify a proxy email address for sending stock data, as well as my personal email to receive the data.

- **AWS EventBridge Schedule**: AWS EventBridge triggers the AWS Lambda function on a set schedule. In this case, it is set to run every 24 hours to fetch and send the stock data daily.

## Tech Stack

- **Backend**: Node.js, Yahoo Finance API
- **Cloud Services**: AWS Lambda, AWS IAM, AWS SES, AWS EventBridge
