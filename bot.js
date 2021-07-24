const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`By Erensy Developers Button V13.0.0 Beta Sistemi`, { type:'WATCHING' })
  
  console.log("CodeWork Akıyor!!")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\
client.on("message", (message) => {

// İhtimaller

if (message.content !== "?button" || message.author.id === ayarlar.sahip || message.author.bot) return;

// Susturulmş
let Susturulmuş = new Discord.MessageButton()
  .setStyle('red') // Rengi ayarlayabilirsiniz.
  .setLabel('Susturulmuş') // Adını Değiştirebilirsiniz.
  .setID('Susturulmuş'); // Adını Değiştirebilirsiniz

// Jail
let Jail = new Discord.MessageButton()
  .setStyle('green') // Rengi ayarlayabilirsiniz.
  .setLabel('Jail') // Adını Değiştirebilirsiniz.
  .setID('Jail'); // Adını Değiştirebilirsiniz
  
// Mute
let Mute = new Discord.MessageButton()
  .setStyle("blurple") // Rengi ayarlayabilirsiniz.
  .setLabel('Mute') // Adını Değiştirebilirsiniz.
  .setID('Mute'); // Adını Değiştirebilirsiniz
  
message.channel.send(`
<a:33:839821153484537907> **Selam, Sunucumuzdaki Rollerini Almak İçin Butonlara Tıklamanız Yeterlidir.**
**__ROLLER__**;
\`>\` <@&859510880131088464>// Susturulmuş ROLÜ
\`>\` <@&859510865521672202>//Jail ROLÜ
\`>\` <@&859510875983708200>//Mute ROLÜ
`, { 
  buttons: [ Susturulmuş, Jail, Mute]
});
});

client.on('clickButton', async (button) => {
    if (button.id === 'Susturulmuş') {
        if (button.clicker.member.roles.cache.get("855428881556439060")) {
            await button.clicker.member.roles.remove("855428881556439060")
            await button.think(true);
            await button.reply.edit("Susturulmuş Rolü Üzerinizden Alındı!")
        } else {
            await button.clicker.member.roles.add("855428881556439060")
            await button.think(true);
            await button.reply.edit("Susturulmuş Rolü Üzerinize Verildi!")
        }
    }
    if (button.id === 'Jail') {
        if (button.clicker.member.roles.cache.get("854983718619971584")) {
            await button.clicker.member.roles.remove("854983718619971584")
            await button.think(true);
            await button.reply.edit(`Jail Rolü Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add("854983718619971584")
            await button.think(true);
            await button.reply.edit(`Jail Rolü Üzerinize Verildi!`)
        }

    }
    if (button.id === 'Mute') {
        if (button.clicker.member.roles.cache.get("854983829251686400")) {
            await button.clicker.member.roles.remove("854983829251686400")
            await button.think(true);
            await button.reply.edit(`Mute Rolü Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add("854983829251686400")
            await button.think(true);
            await button.reply.edit("Mute Rolü Üzerinize Verildi!")
        }
    }
});
////maine///
//Main embed
const disbut = require("discord-buttons");
const disbutpages = require("discord-embeds-pages-buttons")
disbut(client);

client.on("message", async message=>{
if(message.author.bot || message.channel.type == "dm")return;
if(message.content == "t!yardım"){
  //embed 1
  const embed1 = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Tahsin Eren YouTube")
  .addField("Sayfa 1", "[YouTube Kanalım](https://www.youtube.com/channel/UCcXTPZKyebl67ymgLj30i3g)")
  //embed 2
  const embed2 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("Tahsin Eren YouTube")
  .addField("Sayfa 2", "[YouTube Kanalım](https://www.youtube.com/channel/UCcXTPZKyebl67ymgLj30i3g)")
  //embed 3
  const embed3 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTitle("Tahsin Eren YouTube")
  .addField("Sayfa 3", "[YouTube Kanalım](https://www.youtube.com/channel/UCcXTPZKyebl67ymgLj30i3g)")
var pages = [embed1, embed2, embed3]//EMBED EKLEYEBİLİRSİNİZ

disbutpages.pages(client, message, pages, 100000, disbut, "grey", "⏩", "⏪", "❌")
  }
})
///tamamen ERENSY DEVELOPEMENT ' E AİTTİRR !!!
client.on('ready', () => {
  client.channels.cache.get("854843800034738187").send("Başarılı Bir Şekilde Aktif Oldum!")
})

///
