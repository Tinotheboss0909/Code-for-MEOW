
const talkedRecently = new Set();
const data = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment")
const fs = require("fs")
const imgur = require("imgur")
const db = require("quick.db")
const prefix = "l!";
client.useCount = ("./config.json")
const profanity = data.curses
const bot = new Discord.Client({disableEveryone: true});

const { Client, MessageAttachment } = require('discord.js');
client.login(process.env.TOKEN)


client.on('message', message => {
  if (message.author.bot)return;
  let msg = message.content.toLowerCase()
 if (msg === `${prefix}prefix`) {
   message.channel.send(`My prefix is  **__${prefix}__**`)
 }
});
client.on('message', message => {
  if (message.author.bot)return;
  let msg = message.content.toLowerCase();
  if (msg === `${prefix}ping`) {
    message.channel.send('Pong!')
    message.react('🏓')
  }
          
  });

client.on('message', message => {
  if (message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'serverinfo' || command === 'si') {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    let embed = new Discord.MessageEmbed()
    .setTitle(`Info on ${message.guild.name}`)
    .setAuthor(message.guild.name)
    .addField("**Members:**", `${message.guild.memberCount}`, true)
    .addField("**Server ID**", `${message.guild.id}`, true)
    .addField("**Roles**", `${roles.length}`, true)
    .addField("**Owner**", `${message.guild.owner}`, true)
    .addField("**Owner ID**", `${message.guild.ownerID}`, true)
    .addField("**Server Boosts**", `${message.guild.premiumSubscriptionCount}`, true)
    .addField("**Boost Tier**", `${message.guild.premiumTier}`, true)
    .addField("**Region**", `${message.guild.region}`, true)
    .addField("**Created at**", `${moment(message.guild.createdTimestamp).format('L')}\n${moment(message.guild.createdTimestamp).fromNow()}`, true)
    .setColor('#0000FF')
    .setThumbnail(message.guild.iconURL())
  message.channel.send(embed)
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first() || message.member
  const av = member.user.displayAvatarURL({size: 1024});
 if (command === 'info' || command === 'i') {
   let embed = new Discord.MessageEmbed()
   .setTitle(`Info on ${message.author.username}`)
   .setDescription(`[Avatar](${av})`)
   .addField("**Username**", `${member.user.username}`, true)
   .addField("**Discriminator**", `${member.user.discriminator}`, true)
   .addField("**Created at**", `${moment(member.user.createdTimestamp).format('L')}\n${moment(member.user.createdTimestamp).fromNow()}`, true)
   .addField("**Tag**", `${member.user.tag}`, true)
   .addField("**Joined At**", `${moment(member.joinedAt).format('L')}\n${moment(member.joinedAt).fromNow()}`, true)
   .setFooter(`ID: ${member.user.id}`)
   .setThumbnail(av)
   .setColor(member.displayHexColor)
   .setTimestamp();
  message.channel.send(embed)
    }
  
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const pargs = message.content.slice(prefix.length).slice(command.length);
  if (command === '8ball') {
    if (!args.length)return message.reply("You didn't ask a question!") 
  let replies = ["Yes", "No", "No no no.... No!!", "Of course", "100%", "Maybe...", "Ask me later!", "I asked my mom, she said no", "Honestly I could care less", "I guess"]
  let result = Math.floor(Math.random() * replies.length)
  let embed = new Discord.MessageEmbed()
        .setDescription(`Question: **${pargs}**\nAnswer: **${replies[result]}**`)
        .setColor(message.member.displayHexColor)
        .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
  message.channel.send(embed)
    }
});

client.on('message', message => {
console.log(`${message.client.user.username} Is up and running!`)
});


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
       const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'kick') {
    if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply('You dont have kick perms!')
   if (!message.mentions.members.first())return message.reply('You need to actually mention someone!')
    const member = message.mentions.members.first();
        const user = message.mentions.users.first();
    const kreason = args.join(" ").slice(22);
    if (!kreason)return message.reply(`You didn't specify a reason to kick ${member}`)
     member.kick().then(() => {
    message.channel.send(`**${message.mentions.members.first()}** Successfully kicked! **Reason:** ${kreason}`)
    
  }).catch(err => {
      message.channel.send("I wasn't able to kick that user!")
    }).then(() => {
      user.send(`You were kicked in **${message.guild.name}**. **Reason**: ${kreason}`)
    })
    } 
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
       const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'ban') {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('You dont have ban perms!')
   if (!user)return message.channel.send('That isn\'t a valid user/userid!')
    const breason = args.join(" ").slice(22);
     let bchan = client.channels.cache.find(channel => channel.name === 'log' || channel.name === 'logs' || channel.name === 'audit-logs');    
  if (!bchan)return message.channel.send('I was unable to find the log channel, make sure it is named `log`, `logs`, or `audit-logs`')
  message.guild.member(user).ban({reason: breason}).then(() => {
    message.channel.send(`**${user}** Succesfully banned! **Reason:**${breason}`)
      
    
  }).catch(err => {
      message.channel.send("I wasn't able to ban that user!")
    })
    } 
});
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'echo') {
    var chan = message.mentions.channels.first();
    if (!args[0])return message.reply('You need to specify a channel!');
    if (!args[1])return message.reply ('You need to provide a message to send in that channel');
    var par = client.channels.cache.get(chan.id)
    var thing = args.join(" ").slice(22);
   par.send(thing) 
  
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'unban') {
    let user = args[0]
        const breason = args.join(" ").slice(22);
  if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply('Nice try, you dont have ban perms though!');
    if (!user)return message.rey('You need to specifiy a user id!')
      let bchan = client.channels.cache.find(channel => channel.name === 'log' || channel.name === 'logs' || channel.name === 'audit-logs');    
    if (!bchan)return message.channel.send('I was unable to find the log channel, make sure it is named `log`, `logs`, or `audit-logs`')
    let bembed = new Discord.MessageEmbed()
      .setTitle(`${user} Was Unbanned`)
      .addField("**ID:**", `${user.id}`, false)
      .addField("**Unbanned in:**", `${message.channel.id}`, false)
      .addField("**Unbanned by**:", `${message.author.tag}`, false)
  .setTimestamp();
    message.guild.members.unban(user).then(() => {
          message.channel.send(`Successfully Unbanned!`)
    }).catch(err => {
      message.channel.send('I was unable to unban that user')
    }).then(() => {
      bchan.send(bembed)
    })
   
  }
});


client.on('messageDelete', message => {
    if (message.author.bot)return;

  var con = message.content
var user = message.author.tag
var icon = message.author.displayAvatarURL()
client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'snipe') {
      if (!con)return message.reply('There is nothing to snipe')
  let embed =  await new Discord.MessageEmbed()
      .setAuthor(`${user}`, icon)
      .setDescription(con)
      .setColor(message.member.displayHexColor)
  .setTimestamp()
 await message.channel.send(embed)
}
});
  });



const randomPuppy = require("random-puppy")


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'purge' || command === 'pu') {
if (!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send('You cant use this command dumbo')
  if(!args[0])return message.channel.send('You need to tell me how many messages you want to purge!');
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Successfully purged ${args} messages`)
      message.delete()
  }).then(message => message.delete({ timeout: 5000 }) 
    
  ).catch(err => {
    ('I was unable to delete those messages')
  });
  message.delete()

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'clap') {
  const pargs = message.content.slice(prefix.length).slice(command.length);
  const targs = pargs.replace(/\s/g, ' 👏 ') //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'space') {
  const pargs = args.join(" ")
  const emoji = args[0];
  const targs = pargs.replace(/\s/g, ` ${emoji} `) //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify what to space your message with!');
  if (!args[1] || !args[2] || !args[3])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'fruit') {
  var emoji = [" 🍏 ", " 🍎 ", " 🥝 ", " 🍌 ", " 🍒 ", " 🍇 ", " 🍑 ", " 🍐 "];
var emojii = Math.floor(Math.random() * emoji.length)
  const pargs = message.content.slice(prefix.length).slice(command.length);
  const targs = pargs.replace(/\s/g, `${emoji[emojii]}`) //HimynameisFlavio
  if (!args[0])return message.channel.send('You need to specify a message!');
  message.channel.send(targs)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'random') {
  let NewAr = Array.prototype.slice.call(args);
  let tar = Math.floor(Math.random() * NewAr.length)
  if(!args[0])return message.reply('You need to give me 2 elements!')
  if(!args[1])return message.reply('You need to give me 2 elements!')
  message.channel.send(NewAr[tar])
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'help') {
let embed = new Discord.MessageEmbed()
    .setTitle(`Commands for ${message.client.user.username}`)
    .setThumbnail(message.client.user.displayAvatarURL())
    .addField("**Utility**", "`info/i` - Gives you some info on a user your specify\n`serverinfo/si` - Gives you some info on the server\n`ping` - Just to check if the bot is alive\n`prefix` - Get the bot's prefix\n`avatar/av` - Get a user's avatar\n`math/calc/calculate` - Does some math for you!")
    .addField("**Fun commands**", "`8ball` - Just a normal old 8ball command\n`clap` - Replaces all the spaces in your message with 👏\n`fruit` - Replaces all the spaces in your message with a random fruit emoji\n`space` - Replaces all the spaces in your message with a emoji you specify\n`echo` - Send a message in a channel you want!\n`snipe` - Returns the latest delete message(s)\n`random` - Picks a random element from the elements you specify\n`howgay/howgayis` - Get a user's gay percentage\n`meme` - Gives you a quality meme from r/dank\n`lenny` - Gives you a random lenny face\n`argscount/argslength` - Counts the amount of arguments you specified")
    .addField("**Animal commands**", "`cat` - Gives you a random cat picture\n`catbomb` - Gives you 4 random cat images\n`monkey` - Gives you a random monkey image\n`monkeybomb` - Gives you 4 random monkey pictures\n`aww` - Gives you a picture of a cute animal\n`awwbomb` - Gives you 4 random pictures of a cute animal(s)\n`awwnuke` - A lot of cuteness, must be used in <#703021278982045716> for it to work\n`dog` - Gives you a random dog image\n`dogbomb` - Gives your 4 random dog images\n`ferret` - Gives you a random ferret image\n`ferretbomb` - Gives you 4 random ferret images")
    .addField("**Moderation commands**", "`ban` - Bans a user\n`kick` - Kicks a member\n`unban` - Unbans a member\n`purge` - Deletes the amount of messages you specify\n`softban` - Quickly bans then unbans the user")
    .setColor(message.member.displayHexColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter('Made by `ThatGuyTino#5390`')
.setTimestamp()
message.react('🥔')
const response = [embed, ""]
const newresponse =  Math.floor(Math.random() * response.length);
message.author.send(response[newresponse])
if (!response[newresponse]){ message.channel.send('Shut up I dont wanna help you!')
} else message.reply('You\'ve been sent a direct message')
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'howgay' || command === 'howgayis') {
  const member = message.mentions.members.first() || message.member;
const gayness = Math.floor(Math.random() * 100) + 1;
  let embed = new Discord.MessageEmbed()
    .setTitle(`${member.user.username}'s Gay percentage`)
    .setDescription(`${gayness}%`)
    .setAuthor(member.user.tag, member.user.displayAvatarURL('gif'))
    .setTimestamp()
  message.channel.send(embed)

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'softban') {
    if (!message.member.hasPermission('BAN_MEMBERS'))return message.channel.send('You cant use this command dumbo');
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!user)return message.channel.send('You need to mention the user you want to softban!');
   message.guild.member(user).ban({ days: 2}).then(() => {
      message.guild.members.unban(user)
    }).then(() => {
     message.channel.send(`Successfully softbanned ${user}`)
    })

  }
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'meme') {
  var pup = randomPuppy('meme').then(url => {
    console.log(url)
      message.channel.send(url)
  })

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'dog') {
    var pup = randomPuppy('dogpictures').then(url => {
    console.log(url)
      
  })

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'ferret') {
    var pup = randomPuppy('ferrets').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'dogbomb') {
    var pup = randomPuppy('dogpictures').then(turl => {
    console.log(turl)
        var pup = randomPuppy('dogpictures').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('dogpictures').then(purl => {
    console.log(purl)
                var pup = randomPuppy('dogpictures').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'ferretbomb') {
    var pup = randomPuppy('ferrets').then(turl => {
    console.log(turl)
        var pup = randomPuppy('ferrets').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('ferrets').then(purl => {
    console.log(purl)
                var pup = randomPuppy('ferrets').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first() || message.member;
if (command === 'avatar' || command === 'av') {
  let png = member.user.displayAvatarURL({format: "png"})
  let jpg = member.user.displayAvatarURL({size: 1024, dynamic: true, format: 'jpg'})
  let webp = member.user.displayAvatarURL({size: 1024, dynamic: true, format: 'webp'})
  let embed = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag}'s Avatar'`)
    .setDescription(`[png](${png}) | [jpg](${jpg}) | [webp](${webp})`)
    .setImage(member.user.displayAvatarURL({size: 1024, dynamic: true}))
    .setURL(member.user.displayAvatarURL({size: 1024, dynamic: true}))
  message.channel.send(embed)
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'cat') {
    var pup = randomPuppy('cat').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'monkey') {
    var pup = randomPuppy('monkeys').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'catbomb') {
    var pup = randomPuppy('cats').then(turl => {
    console.log(turl)
        var pup = randomPuppy('cats').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('cats').then(purl => {
    console.log(purl)
                var pup = randomPuppy('cats').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'monkeybomb') {
    var pup = randomPuppy('monkeys').then(turl => {
    console.log(turl)
        var pup = randomPuppy('monkeys').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('monkeys').then(purl => {
    console.log(purl)
                var pup = randomPuppy('monkeys').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'aww') {
    var pup = randomPuppy('aww').then(url => {
    console.log(url)
       
            message.channel.send(url)
  
   })  

}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'awwbomb') {
    var pup = randomPuppy('aww').then(turl => {
    console.log(turl)
        var pup = randomPuppy('aww').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('aww').then(purl => {
    console.log(purl)
                var pup = randomPuppy('aww').then(furl => {
    console.log(furl)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'awwnuke') {
    var pup = randomPuppy('aww').then(turl => {
    console.log(turl)
        var pup = randomPuppy('aww').then(yurl => {
    console.log(yurl)
            var pup = randomPuppy('aww').then(purl => {
    console.log(purl)
                var pup = randomPuppy('aww').then(furl => {
    console.log(furl)
                  var pup = randomPuppy('aww').then(curl => {
    console.log(curl)
                    var pup = randomPuppy('aww').then(zurl => {
    console.log(zurl)
                      var pup = randomPuppy('aww').then(vurl => {
    console.log(vurl)
                     var pup = randomPuppy('aww').then(tino => {
    console.log(tino)
                          var pup = randomPuppy('aww').then(mush => {
    console.log(mush)
                            var pup = randomPuppy('aww').then(beast => {
    console.log(beast)
            if (message.channel.id !== '703021278982045716')return message.channel.send(`You must be in <#703021278982045716> to use this command, because the messages are too big`)
              message.channel.send(turl)
              message.channel.send(yurl)
              message.channel.send(purl)
              message.channel.send(furl)
              message.channel.send(curl)
              message.channel.send(zurl)
              message.channel.send(vurl)
              message.channel.send(tino)
              message.channel.send(mush)
              message.channel.send(beast)
                      })
                      })
                    })
                     })
                      })
                    })
                  
                })
                })
            })
        })
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command === 'lenny') {
  let lennies = ["( ͡° ͜ʖ ͡°)", "(╭☞⨶ᴥ⨶)╭☞", "⎝■~■⎠", "(⨴ꔢ⨵)", "(⍜⏠⍜)╭∩╮", "(づ⨱ل͜⨱)づ", "(╭☞ཀヮཀ)╭☞", "─=≡Σᕕ(꘠▾꘠)ᕗ"];
  let lenny = Math.floor(Math.random() * lennies.length)
  message.channel.send(lennies[lenny])
}
})

client.on('message', message => {
  if (message.channel.id !== '707780490681253959' || message.author.bot)return;
  let msg = message.content.toLowerCase();
  if (msg !== '.verify') {
    message.delete()
  }
})





client.on('message', message => {
  if (message.author.bot)return;
  let msg = message.content.toLowerCase()
  if (msg.includes('kill myself') || msg.includes('kms') || msg.includes('commit suicide') || msg.includes('suicide')) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Suicide Hotline')
      .setDescription('If your ever feeling suicidal, you can always get help at https://suicidepreventionlifeline.org/, or by calling this number `1-800-273-8255`')
  message.channel.send(embed)
    }

})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();   
  let NewAr = Array.prototype.slice.call(args);
  if (command === 'argscount' || command === 'argslength') {
    let count = NewAr.length
    message.channel.send(`You said **${count}** arguments`)
  }

})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return; 
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();   
if (command === 'math' || command === 'calculate' || command === 'calc') {
    let NewAr = Array.prototype.slice.call(args);
  var pars = args.join(" ")
  try { 
    var yes = eval(pars) 
    } catch(err) {
      message.channel.send('That isn\'t a valid equation! Here are the math characters.. \n`*` = Multiplication, `-` = Subtraction, `/` = Divison, `**` = Exponation, `%` = Modulo, `+` = Addition')
    }
  if (!pars[0] || !pars[2])return message.channel.send('You need to give me a math equation!');
  message.channel.send(yes)
  console.log(`Equation: ${pars} Answer: ${yes}`)
} 
})



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase();   
  if (command === 'amatic') {
let amatic = {
    "a": "α",
    "b": "Ⴆ",
    "c": "ƈ",
    "d": "ԃ",
    "e": "ҽ",
    "f": "ϝ",
    "g": "ɠ",
    "h": "ԋ",
    "i": "ι",
    "j": "ʝ",
    "k": "ƙ",
    "l": "ʅ",
    "m": "ɱ",
    "n": "ɳ",
    "o": "σ",
    "p": "ρ",
    "q": "ϙ",
    "r": "ɾ",
    "s": "ʂ",
    "t": "ƚ",
    "u": "υ",
    "v": "ʋ",
    "w": "ɯ",
    "x": "x",
    "y": "ყ",
    "z": "ȥ"
}

    let p = args.join(" ").toLowerCase();
let characters = p.split("");
let newString = "";

characters.forEach(character => {
let convertedCharacter = amatic[character] || character;
  newString += convertedCharacter;
});

message.channel.send(newString);
  }
  })



client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
 const args = message.content.slice(prefix.length).trim().split(' ')
 const command = args.shift().toLowerCase();   
  if (command === 'nsfw') {
    if (!message.channel.nsfw)return message.channel.send('This channel isn\'t nsfw, move to a NSFW channel!')
  message.channel.send('Here\'s your nsfw..... hah! you thought!!!')
  }
})

const EvenEmitter = require("events")
class MyEmitter extends EvenEmitter{}

var emitter = new MyEmitter();
var emitter2 = new MyEmitter();

emitter.setMaxListeners(20)

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
   const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'suggest') {
  let chan = message.guild.channels.cache.find(channel => channel.name === 'suggestion' || channel.name === 'suggestions');
  if (!chan)return message.channel.send('I was unable to find the suggestion channel, make sure it is called `suggestion` or `suggestions`');
    if (!args[0])return message.channel.send('You need to actually suggest something!');
      const kreason = args.join(" ");
  db.set(`tino_${message.guild.id}`, 1)
  let dbfetch = db.fetch(`tino_${message.guild.id}`);
  
  let embed = new Discord.MessageEmbed()
  .setTitle(`Suggestion #${dbfetch}`) 
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(kreason)
    .setFooter(`ID:${message.author.id}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(message.member.displayHexColor)
    .setTimestamp()
    message.delete()
  chan.send(embed).then(function (message) {
    message.react('737362033443602464')
    message.react('737362086023135272')
  })
}
})



client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'pingmods') {
    const tembed = new Discord.MessageEmbed()
      .setDescription(`${message.author} Needs a moderator!`) 
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))   
      .setAuthor(message.author.tag, message.author.displayAvatarURL())   
      .setFooter(message.author.id)
      .setTimestamp();
    const embed = new Discord.MessageEmbed()
        .setTitle('Are you sure?')
        .setDescription('Are you sure you want to ping all mods? If your ping is useless/uneeded, you will be subject to moderator action. Think about that when deciding.\nReact with <:green_tick:737362033443602464> to accept, or <:red_tick:737362086023135272> to deny.')
        .setThumbnail(message.author.displayAvatarURL())
   const Eembed = new Discord.MessageEmbed()
        .setTitle('Ping cancelled!')
    const embed2 = new Discord.MessageEmbed()
        .setTitle('Timedout, no reaction in 10 seconds!')
        
        const questionMessage = await message.channel.send(embed)
      
    
    await questionMessage.react('737362033443602464')
    await questionMessage.react('737362086023135272')

    try {
      const collected = await questionMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.id == '737362086023135272' || reaction.emoji.id == '737362033443602464'),
                                     { max: 1, time: 10000, errors: ['time']})
      
      console.log(collected.first().emoji.id)
      if (collected.first().emoji.id == '737362033443602464') {
        questionMessage.edit(`<@&737781781415198861>`)
        questionMessage.edit(tembed)
              questionMessage.reactions.removeAll()
      }
      else questionMessage.edit(Eembed)
          questionMessage.reactions.removeAll()
      } catch (error) {
            questionMessage.edit(embed2)
          questionMessage.reactions.removeAll()
    }
    
  }
})
 


client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot)return; 
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
 if (command == 'commandsused') { 
  db.add(`commandran_${message.guild.id}`, 1);
  let dbfetch = db.fetch(`commandran_${message.guild.id}`);
  message.channel.send(`Today, users have ran ${dbfetch} commands`);
}
})


  client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command == 'hack') {
    const user = await message.mentions.users.first() || args[0];
    if (!user)return message.channel.send('I cant hack nothing!');
        const puser = await client.users.fetch(user.id).catch(err => {
       args[0]
        })
    const msg = await message.channel.send(`Hacking ${puser}....`)
    client.setTimeout(() => msg.edit('Getting Password....'), 1500);
    client.setTimeout(() => msg.edit('Password retrived!!'), 3000);
    client.setTimeout(() => msg.edit('Almost done hacking!'), 4500);
    client.setTimeout(() => msg.edit('I now have access to all of their accounts!'), 5500);
    
    
    

  }
  })

  client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot)return;
  })

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
if (command == 'dm') {
  if (!args[0])return message.channel.send('You need to specify a time!');
  const msg = await client.setTimeout(() => message.author.send('Hello!'), args[0]);
}
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
if (command == 'bal' || command == 'balance') {
db.add(`bal_${message.author.id}`, 0)
  let bal = db.get(`bal_${message.author.id}`)
  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setDescription(`Balance: **${bal}$**`)
    .setTimestamp()
    message.channel.send(embed)
}
})

client.on('message', async message => {
if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command == 'work') {
    const amount = Math.floor(Math.random() * 500) + 100;
    const amount2 = Math.floor(Math.random() * 400) + 100;
    const amount3 = Math.floor(Math.random() * 1100) + 250;
    const amount4 = Math.floor(Math.random() * 625) + 125;
    const job = db.get(`job_${message.author.id}`)
    if (job == 0) {
      message.channel.send('You dont have a job!'); 
    } else if (job != 0) {
      if (talkedRecently.has(message.author.id)) {
        message.channel.send("This command has a 45 minute cooldown!");
} else {
      
    
     if (job == 'officer') {
    
    message.channel.send(`You had a long night shift as a police officer, but it paid well!\nYou earned ${amount}$ Today!`)
    db.add(`bal_${message.author.id}`, amount)
    
  } else if (job == 'farmer') {
    message.channel.send(`You plowed the fields, and milked the cows. So you earned ${amount2}$!`)
    db.add(`bal_${message.author.id}`, amount2)
  } else if (job == 'engineer') {
    message.channel.send(`You made a DC motor, and got paid ${amount3}$!`)
    db.add(`bal_${message.author.id}`, amount3)
  } else if (job == 'musician') {
   message.channel.send(`You song got #10 on spotify, so you made ${amount4}$!`)
   db.add(`ban_${message.author.id}`, amount4)
  } else message.channel.send('You dont have a job!')
} talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 2700000);
    }
}
    
})

client.on('message', async message => {
if (!message.content.startsWith(prefix) || message.author.bot)return;
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
let embed = new Discord.MessageEmbed()
.setTitle('Valid jobs!')
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setColor(message.member.displayHexColor)
.setDescription('- `police`\n- `farmer`\n- `engineer`\n- `musician`')
.setTimestamp();
if (command == 'job') {
  if (!args[0])return message.channel.send('You didn\'t specify a job!');
  if (args[0] == 'police') {
    await db.set(`job_${message.author.id}`, 'officer');
    message.channel.send('I set your job occupation to.. `police`!');

  } else if (args[0] == 'farmer') {
    await db.set(`job_${message.author.id}`, 'farmer');
    message.channel.send('I set your job occupation to.. `farmer`!');
  } else if (args[0] == 'engineer') {
    await db.set(`job_${message.author.id}`, 'engineer')
    message.channel.send('I set your job occupation to.. `engineer`!');
  } else if (args[0] == 'musician') {
    await db.set(`job_${message.author.id}`, `musician`)
   message.channel.send('I set your job occupation to.. `musician`!')
  } else if (args[0] == 'list') {
    message.channel.send(embed)
  } else if (args[0] == 'none' || args[0] == 'remove') {
    message.channel.send('Alright, you are no longer employed!')
    db.set(`job_${message.author.id}`, 0)
  }
  else message.channel.send('That isn\'t a valid job! Do `l!job list` to get a list of jobs');
}
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (command == 'work-info' || command == 'job-info') {
const bal = db.get(`bal_${message.author.id}`)
const job = db.get(`job_${message.author.id}`)
const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
  .setTitle('Some info on you!')
  .addField("**Balance**", `**${bal}$**`, true)
  .addField("**Employment**", `${job}`, true)
  .setColor(message.member.displayHexColor)
  .setTimestamp();
  message.channel.send(embed)
}
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (command == 'inventory' || command == 'inv') {
  const inv = await db.get(`inven_${message.author.id}`, { items: [] })
  if (inv === null)return message.channel.send('You dont have anything your inventory!')
    const newinv = inv.join(", ");
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setTitle('Your inventory!')
  .setDescription(newinv)
  message.channel.send(embed)
}
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()
  if (command === 'shop' || command == 'store') {
    const sword = 355;
    const pig = 100;
    const inv = db.get(`inven_${message.author.id}`, { items: [] })
    const bal = db.get(`bal_${message.author.id}`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle('The shop!')
    .addField("**Pig**", `${pig}$`, true)
    .addField("**Sword**", `${sword}$`, true)
    .setFooter('Shop made my ThatGuyTino#5390 ')
    .setTimestamp();
    if (!args[0]) {
      message.channel.send(embed)
    } else if (args[0] == 'pig') {
      if (bal < `${pig}`)return message.channel.send('You cant afford a pig!');
      if (inv !== null) {
      if (inv.indexOf("pig") !== -1)return message.channel.send('You already have pig!');
      }
      message.channel.send(`I added a pig to your inventory!`)
      db.push(`inven_${message.author.id}`, "pig");
      db.subtract(`bal_${message.author.id}`, pig)
    } else if (args[0] == 'sword') {
        if (bal < `${sword}`)return message.channel.send('You cant afford a sword!')
      if (inv !== null) {
      if (inv.indexOf("sword") !== -1)return message.channel.send('You already have a sword!')
      }
        message.channel.send(`I added a sword to your inventory!`)
        db.push(`inven_${message.author.id}`, "sword")
        db.subtract(`bal_${message.author.id}`, sword)
    } 
  } else if (!message.content.startsWith(prefix) || message.author.bot)return;
    if (command == 'remove') {
    const inv = db.get(`inven_${message.author.id}`, { items: [] })
        if (inv == null)return message.channel.send('You dont have anything in your inventory!')
    const position = inv.indexOf(args[0])
    message.channel.send(inv)
   if (!args[0])return message.channel.send('What item do you want to remove?!');
   if (inv.indexOf(args[0]) == -1)return message.channel.send('You dont have that item in your inventory!')
  message.channel.send(`Successfully removed ${inv[position]}`)
  inv.splice(position, 1)
      

  } else if (command == 'bet') {
    const newmoney = args[0] * 2;
    const balance = db.get(`bal_${message.author.id}`)
    const output = ["Yes", "No"]
    const newoutput = Math.floor(Math.random() * output.length)
    const input = output[newoutput];
    if (!args[0])return message.channel.send('You need to actually bet something!')
    if (args[0] <= 0)return message.channel.send('You cant bet 0$!');
    if (args[0] > balance)return message.channel.send(`You cant bet that much! You only have **${balance}$**`)
    if (input == 'No') {
      message.channel.send(`You lost ${args[0]}$!`)
      db.subtract(`bal_${message.author.id}`, args[0])
    } else message.channel.send(`You won ${newmoney}$!`)
    db.add(`bal_${message.author.id}`, newmoney)

  } else if (command == 'add-money') {
    const role = 721526644052852766
    if (!message.member.roles.cache.some(role => role.id == 721526644052852766))return message.channel.send('You cant use this command dumbo!')
    const user = message.mentions.users.first()
    if (!user)return message.channel.send('Who do you want to add money to....?')
    const newuser = client.users.fetch(user.id).catch(err => {
      message.channel.send('I couldn\'t find that user!')
    })
    if (!args[1])return message.channel.send('How much money do you want to give them!?!')
    db.add(`bal_${user.id}`, args[1])
    message.channel.send('Success!')
  }
})





client.on('message', async message => {
 if (message.author.bot)return;
 db.add(`level_${message.author.id}_${message.guild.id}`, 0)
 let n = await db.add(`level_${message.author.id}_${message.guild.id}`, 1)
 let pop = await db.get(`level_${message.author.id}_${message.guild.id}`)
 
   var result = (n - Math.floor(n)) !== 0; 
  
  if (result) {
   message.reply(`Good job on getting to level ${result}`) 
   message.channel.send('Sup!')
  } else if (message.content.toLowerCase() == `${prefix}xp`) {
message.channel.send(pop)
  }
})


client.on('message', async message => {
  if (message.author.bot)return;
  const insults = ["You’re the reason God created the middle finger.", "You’re a grey sprinkle on a rainbow cupcake.", "If your brain was dynamite, there wouldn’t be enough to blow your hat off.", "You are more disappointing than an unsalted pretzel.", "Light travels faster than sound which is why you seemed bright until you spoke.", "We were happily married for one month, but unfortunately we’ve been married for 10 years.", "Your kid is so annoying, he makes his Happy Meal cry.", "You have so many gaps in your teeth it looks like your tongue is in jail.", "Your secrets are always safe with me. I never even listen when you tell me them.", "I’ll never forget the first time we met. But I’ll keep trying."]
  const result = Math.floor(Math.random() * insults.length)

client.setTimeout(() => message.channel.send(insults[result]), 20000)

})
