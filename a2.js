/* "StAuth10222: I Akshpreet Singh Punj, 000820040 certify that this material is my original work. 
    No other person's work has been used without due acknowledgement. 
    I have not made my work available to anyone else." 
*/

const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, 
               GatewayIntentBits.GuildMessages,
               GatewayIntentBits.MessageContent, ],
});

// The ready event will occur after discord bot is finished logging in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

// The messageCreate event will occur when a message is entered into a discord channel
client.on('messageCreate', async message => {
    // Checking that the author of message is not a bot (such as itself) before sending a reply
    if(!message.author.bot) {
        // Spliting the message into multiple strings based on spaces
        command = message.content.split(" ");
        console.log(command);

        // Handles regular message which follows a certain command syntax

        // Command for retrieving the Cryptocurrency price
        // Api Source: https://docs.coincap.io/
        if(command[0] == "CryptoPrice"){
            op1 = command[1];

            axios.get(`https://api.coincap.io/v2/assets?search=${op1}&limit=1`).then(async function (res){
                try {
                    console.log(res.data);

                    // Cryptocurrency data from the api
                    cryptoName = res.data.data[0].name;
                    cryptoPrice = parseFloat(res.data.data[0].priceUsd).toFixed(2);
                    result = `The price of ${cryptoName} is ${cryptoPrice} USD.`;
                    console.log(result);

                    // sending a reply to the message back with the results in discord
                    await message.reply(result);
                } catch (e) {
                    // sending the error message back 
                    await message.reply("Cryptocurrency name or symbol value is incorrect. Please try again!");
                }
            });
        }

        // Command for retrieving the stock price
        // Api Source: https://www.stockdata.org/documentation
        if(command[0] == "StockPrice"){
            op1 = command[1];

            axios.get(`https://api.stockdata.org/v1/data/quote?symbols=${op1}&api_token=`).then(async function (res){
                try {
                    console.log(res.data);

                    // Stock data from the api
                    companyName = res.data.data[0].name;
                    stockPrice = parseFloat(res.data.data[0].price).toFixed(2);
                    result = `The stock price of ${companyName} is ${stockPrice} USD.`;
                    console.log(result);

                    // sending a reply to the message back with the results in discord
                    await message.reply(result);
                } catch (e) {
                    // sending the error message back 
                    await message.reply("Stock company symbol value is incorrect. Please try again!");
                }
            });
        }

        // Command for retrieving the latest stock market & finance news information
        // Api Source: https://www.stockdata.org/documentation
        if(command[0] == "MarketNews"){
            op1 = command[1];
            op2 = command[2];

            axios.get(`https://api.stockdata.org/v1/news/all?symbols=${op1}&filter_entities=true&language=${op2}&limit=1&api_token=`).then(async function (res){
                try {
                    console.log(res.data);

                    // Stock market & finance news data from the api
                    title = res.data.data[0].title;
                    description = res.data.data[0].description;
                    url = res.data.data[0].url;
                    result = `Title: ${title} \nDescription: ${description} \nURL: ${url}`;
                    console.log(result);

                    // sending a reply to the message back with the results in discord
                    await message.reply(result);
                } catch (e) {
                    // sending the error message back
                    await message.reply("The input command is incorrect. Please provide the stock company symbol and language (like en,es) for the stock market news.");
                }
            });
        }

        // Command for converting a particular amount from one currency to another
        // Api Source: https://exchangerate.host/#/#docs
        if(command[0] == "CurrencyConversion"){
            op1 = command[1];
            op2 = command[2];
            op3 = command[3];

            axios.get(`https://api.exchangerate.host/convert?from=${op1}&to=${op2}&amount=${op3}`).then(async function (res){
                try {
                    console.log(res.data);

                    // Currency Exchange data from the api
                    from = res.data.query.from;
                    to = res.data.query.to;
                    amount = res.data.query.amount;
                    conversionResult = parseFloat(res.data.result).toFixed(2);
                    result = `The conversion result for amount ${amount} from ${from} to ${to} = ${conversionResult}`;
                    console.log(result);

                    // sending a reply to the message back with the results in discord
                    await message.reply(result);
                } catch (e) {
                    // sending the error message back
                    await message.reply("The input command is incorrect. Please provide 2 currency code value and amount for currency conversion.")
                }
            });
        }

        // Command for retrieving the weather information for a particular geographical coordinates (latitude, longitude)
        // Api Source: https://openweathermap.org/current#one
        if(command[0] == "Weather"){
            op1 = command[1];
            op2 = command[2];

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${op1}&lon=${op2}&units=metric&appid=`).then(async function (res){
                try {
                    console.log(res.data);

                    // Weather data from the api
                    cityName = res.data.name;
                    countryName = res.data.sys.country;
                    temperature = res.data.main.temp;
                    weather = res.data.weather[0].description;
                    humidity = res.data.main.humidity;
                    result = `The temperature in ${cityName}, ${countryName} is ${temperature}°C [Humidity: ${humidity}%, Condition: ${weather}]`;
                    console.log(result);

                    // sending a reply to the message back with the results in discord
                    await message.reply(result);
                } catch (e) {
                    // sending the error message back
                    await message.reply("The input command is incorrect. Please provide the latitude and longitude value for weather.")
                }
            });
        }
    }
});

// Discord Bot Token
client.login("");