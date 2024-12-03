# StockPriceEmailer
This project provides the functionality of sending me a daily email of stock prices of given tickers. I will detail its different components:
 - Node.js script: The Node.js script uses SESClient to send an email using AWS Simple Email Service. The script uses the Yahoo Finance API to get stock data on prices of tickers entered in the script. 
 - AWS Lambda Function: The AWS Lambda function consists of an execution role giving it the ability to make API calls to AWS Simple Email Service, a layer containing the node package dependencies, and the Node.js script using the runtime supporting the latest version of Node.js on ARM.
 - AWS IAM Policy: The Identity and Access Management policy adheres to the principle of least privellege and is attached to an AWS Identity and Access Management role to allow an AWS Lambda function to invoke the AWS Simple Email Servcie API.
 - AWS SES: The AWS Simple Email Service registers and verifies a proxy email to send the data as well as my personal email address to receive the data. 
 - AWS EventBridge Schedule: The AWS EventBridge schedule invoked the AWS Lambda function as needed and the given schedule was every 24 hours to get stock data once daily.
