/*
server.js – Configures the Plaid client and uses Express to defines routes that call Plaid endpoints in the Sandbox environment.Utilizes the official Plaid node.js client library to make calls to the Plaid API.
*/

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const app = express();

app.use(
  // FOR DEMO PURPOSES ONLY
  // Use an actual secret key in production
  session({
    secret: process.env.REACT_APP_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.REACT_APP_PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.REACT_APP_PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.REACT_APP_PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

//Creates a Link token and return it
app.get("/api/create_link_token", async (req, res, next) => {
  const tokenResponse = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "Plaid's Tiny Quickstart",
    language: "en",
    products: ["auth", "transactions"],
    country_codes: ["US"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponse.data);
});

// Exchanges the public token from Plaid Link for an access token
app.post("/api/exchange_public_token", async (req, res, next) => {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.access_token = exchangeResponse.data.access_token;
  res.json(true);
});

// Fetches balance data using the Node client library for Plaid
// app.get("/api/balance", async (req, res, next) => {
//   const access_token = req.session.access_token;
//   const balanceResponse = await client.accountsBalanceGet({ access_token });
//   res.json({
//     Balance: balanceResponse.data,
//   });
// });

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

app.get("/api/transactions/get", async (req, res, next) => {
  const access_token = req.session.access_token;
  //currently only gets current month's transactions
  const start_date = `${currentYear}-${
    currentMonth < 10 ? `0${currentMonth}` : currentMonth
  }-01`;
  const end_date = formattedDate;
  const transactionResponse = await client.transactionsGet({
    access_token,
    start_date,
    end_date,
  });
  res.json({
    Transactions: transactionResponse.data,
  });
});

app.listen(process.env.PORT || 8080);
