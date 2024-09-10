
# Capybara Bet Lambda

This project is a Serverless service that deploys an AWS Lambda function to generate a random number daily and store it in a DynamoDB table. The Lambda function can be triggered via an HTTP API or scheduled to run every 24 hours. The project also includes a React Native frontend (check it out 👉 [CapybaraBet](link-to-project)) that calls the Lambda function to retrieve the random number and check if the user guessed the correct number.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Frontend - React Native](#frontend---react-native)
- [Backend - AWS Lambda](#backend---aws-lambda)
- [Installation](#installation)
  - [Backend](#backend)
- [Usage](#usage)
  - [Backend Deployment](#backend-deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project consists of two main components:

1. **Backend**: A Lambda function that generates and stores a random number in a DynamoDB table named `sorted-number`.
2. **Frontend**: A React Native app that allows users to guess the random number and check if they win the bet.

## Architecture

- **Lambda Function**: Generates a random number and stores it in DynamoDB.
- **DynamoDB Table**: Stores the daily random number with a unique key.
- **API Gateway**: Provides an HTTP endpoint to trigger the Lambda function.
- **CloudWatch Events**: Schedules the Lambda function to run daily.
- **React Native Frontend**: Calls the Lambda function to get the random number and checks if the user guessed correctly.

## Frontend - React Native

The React Native app provides a simple user interface where users can:

- Enter their guess for the random number.
- Submit the guess to the backend (Lambda function) to check if it matches the stored random number.
- Display a message with an image indicating whether the guess was correct or not.

## Backend - AWS Lambda

The Lambda function is responsible for generating the random number, storing it in DynamoDB, and responding to HTTP requests from the React Native app.

## Installation

### Backend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/capybara-bet-lambda.git
   cd capybara-bet-lambda
   ```

2. **Install Dependencies:**

   ```bash
   npm install

## Usage

### Backend Deployment

Deploy the backend using the Serverless Framework:

```bash
serverless deploy
```

Make sure that your AWS credentials are properly configured in your local environment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
