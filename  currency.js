const data = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment")
const fs = require("fs")
const prefix = "l!";
const imgur = require("imgur")
const db = require("quick.db")
client.useCount = ("./config.json")
const profanity = data.curses
const bot = new Discord.Client({disableEveryone: true});
client.login(process.env.TOKEN)

