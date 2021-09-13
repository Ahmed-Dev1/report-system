

const Discord = require('discord.js');
const client = new Discord.Client();


const fs = require('fs');
const db = require('quick.db');
const pretty = require('pretty-ms');
client.commands = new Discord.Collection();
client.config = require('./src/config/bot.json');
client.snipe = new Discord.Collection();
const { MessageButton , MessageActionRow } = require(`discord-buttons`)
 
fs.readdir('./src/events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./src/events/${file}`);
        let eventName = file.split('.')[0];
        console.log(`Loading ${eventName}.js!`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, categories, message) => {
    if (err) console.log(err)
    console.log(`Found total ${categories.length} categories.`)
    categories.forEach(category => {
          let categoryName = category.split('.')[0];
      console.log(`Loading ${categoryName}.js!`);
fs.readdir(`./commands/${category}`, (error,files) => {
  if (error) { return console.log("error i can not find commands"); };
  files.filter(file=>file.endsWith(".js")).forEach(file => {
    const command = require(`./commands/${category}/${file}`);
    console.log(`Loading Command ` + command.name)
    client.commands.set(command.name, command);
})
 })
})
})

client.login(client.config.main.token_bot).catch(err => {
    console.table({
        Error: "THE TOKEN IS INVIELD"
    })
});