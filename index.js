require("./src/server/server.js");
require("dotenv");
const Discord = require('discord.js')
const { Client, Collection, MessageEmbed } = require("discord.js");
require("discord-reply");
const client = new Client();
const fs = require("fs");
const chalk = require("chalk");
const db = require("quick.db");

client.config = require("./config.js");
client.commands = new Collection();

fs.readdir("./src/events/", (err, files) => {
    if (err) return console.log(chalk.red.bold(err));
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./src/events/${file}`);
        let eventName = file.split(".")[0];
        console.log(
            chalk.green.bold("Loading Event: ") + chalk.red.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});
fs.readdir(`./src/commands/`, (err, files) => {
    if (err) return console.log(chalk.red.bold(err));
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const command = require(`./src/commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(
            chalk.green.bold("Loading Command: ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(command.name, command);
    });
});

const guildInvites = new Map();

client.on("inviteCreate", async invite =>
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);
client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
        guild
            .fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        let d = new Date(member.user.createdAt);
        let registeredDate = d.getMonth();
        console.log(registeredDate);
        const usedInvite = newInvites.find(
            inv => cachedInvites.get(inv.code).uses < inv.uses
        );
        db.set(`Gda_${member.id}_${member.guild.id}`, {
            invitedBy: usedInvite.inviter.id,
            invitedByP: usedInvite.inviter.tag,
            invitedByA: usedInvite.inviter.avatarURL({ dynamic: true }),
            regular: 0,
            fack: 0,
            leaves: 0,
            all: 0,
            invitedUrl: usedInvite.url,
            invites: ["", ""]
        });
        var regular = db.get(`GmaInfo_${usedInvite.inviter.id}_${member.guild.id}.regular`);
        var ConfigFakeTime = db.get(`ConfigFakeTime_${member.guild.id}.value`);
        if (ConfigFakeTime == null || undefined) ConfigFakeTime = 3;
        if (regular == null || undefined) {
            db.set(`Gda_${usedInvite.inviter.id}_${member.guild.id}`, {
                invitedBy: '',
                invitedByP: '',
                invitedByA: '',
                regular: 0,
                fack: 0,
                leaves: 0,
                all: 0,
                invitedUrl: '',
                invites: ["", ""]
            });
            if (
                registeredDate == null ||
                undefined ||
                NaN ||
                registeredDate < ConfigFakeTime
            ) {
                if (member.id == usedInvite.inviter.id) return;
                db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`, 1);
                db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`, Number(usedInvite.uses));
                setTimeout(() => {
                    db.add(
                        `Gda_${usedInvite.inviter.id}_${member.guild.id}.regular`,
                        Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`)) -
                        Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`))
                    );
                }, 1000);
                var chack = db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`);
                if (chack.includes(member.id)) return;
                db.push(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`, member.id);
            } else {
                if (member.id == usedInvite.inviter.id) return;
                db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`, Number(usedInvite.uses));
                setTimeout(() => {
                    db.add(
                        `Gda_${usedInvite.inviter.id}_${member.guild.id}.regular`,
                        Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`)) -
                        Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`))
                    );
                }, 1000);
                var chack = db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`);
                if (chack.includes(member.id)) return;
                db.push(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`, member.id);
            }
            return;
        }
        if (
            registeredDate == null ||
            undefined ||
            NaN ||
            registeredDate < ConfigFakeTime
        ) {
            if (member.id == usedInvite.inviter.id) return;
            db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`, 1);
            db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`, Number(usedInvite.uses));
            setTimeout(() => {
                db.add(
                    `Gda_${usedInvite.inviter.id}_${member.guild.id}.regular`,
                    Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`)) -
                    Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`))
                );
            }, 1000);
            var chack = db.get(
                `Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`
            );
            if (chack.includes(member.id)) return;
            db.push(
                `Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`,
                member.id
            );
        } else {
            if (member.id == usedInvite.inviter.id) return;
            db.add(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`, Number(usedInvite.uses));
            setTimeout(() => {
                db.add(
                    `Gda_${usedInvite.inviter.id}_${member.guild.id}.regular`,
                    Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.all`)) -
                    Number(db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.fack`))
                );
            }, 1000);
            var chack = db.get(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`);
            if (chack.includes(member.id)) return;
            db.push(`Gda_${usedInvite.inviter.id}_${member.guild.id}.invites`, member.id);
        }
    } catch (err) {
        console.log(err);
    }
});

client.on("guildMemberAdd", member => {
            var channeler = db.get(`ConfigWelcomeChannel_${member.guild.id}.value`);
            if (channeler == null || undefined) return;
            var channel = member.guild.channels.cache.get(channeler);
            var embed = db.get(`ConfigWelcomeChannelEmbed_${member.guild.id}.value`);
            var invierTemp = db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`);
            if (invierTemp == null || undefined) return;
            var ConfigWelcomeChannelMessage = db.get(
                `ConfigWelcomeChannelMessage_${member.guild.id}.value`
            );
            if (ConfigWelcomeChannelMessage == null || undefined)
                ConfigWelcomeChannelMessage = `**<@!${
      member.id
    }>** just joined. They were invited by **${db.get(
      `Gda_${member.id}_${member.guild.id}.invitedByP`
    )}** who now has **${db.get(
      `Gda_${invierTemp}_${member.guild.id}.all`
    )} invites** !`;
  if (embed == "on") {
    channel.send(
      new MessageEmbed()
        .setDescription(
          ConfigWelcomeChannelMessage.replace(
            "[User Mention]",
            `<@!${member.id}>`
          )
            .replace("[User Tag]", member.tag)
            .replace("[User Id]", member.id)
            .replace("[Guild Count]", member.guild.memberCount)
            .replace("[Guild Name]", member.tag)
            .replace(
              "[Inviter Mention]",
              `<@!${db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)}>`
            )
            .replace(
              "[Inviter Tag]",
              db.get(`Gda_${member.id}_${member.guild.id}.invitedByP`)
            )
            .replace(
              "[Inviter Id]",
              db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)
            )
            .replace(
              "[Inviter Uses]",
              db.get(`Gda_${invierTemp}_${member.guild.id}.all`)
            )
        )
        .setColor(member.displayHexColor)
        .setThumbnail(db.get(`Gda_${member.id}_${member.guild.id}.invitedByA`)) // delete this line if you wont
        .setFooter(
          `Invited By: ${db.get(
            `Gda_${member.id}_${member.guild.id}.invitedByP`
          )}`,
          db.get(`Gda_${member.id}_${member.guild.id}.invitedByA`)
        )
        .setTimestamp()
    );
  } else {
    channel.send(
      ConfigWelcomeChannelMessage.replace("[User Mention]", `<@!${member.id}>`)
        .replace("[User Tag]", member.tag)
        .replace("[User Id]", member.id)
        .replace("[Guild Count]", member.guild.memberCount)
        .replace("[Guild Name]", member.tag)
        .replace(
          "[Inviter Mention]",
          `<@!${db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)}>`
        )
        .replace(
          "[Inviter Tag]",
          db.get(`Gda_${member.id}_${member.guild.id}.invitedByP`)
        )
        .replace(
          "[Inviter Id]",
          db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)
        )
        .replace(
          "[Inviter Uses]",
          db.get(`Gda_${invierTemp}_${member.guild.id}.all`)
        )
    );
  }
});

client.on("guildMemberRemove", member => {
  var channeler = db.get(`ConfigLeaveChannel_${member.guild.id}.value`);
  if (channeler == null || undefined) return;
  var channel = member.guild.channels.cache.get(channeler);
  var embed = db.get(`ConfigWelcomeChannelEmbed_${member.guild.id}.value`);
  var invierTemp = db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`);
  if (invierTemp == null || undefined) return;
  var inviteTemp2 = db.get(`Gda_${member.id}_${member.guild.id}.invitedByP`);
  if (inviteTemp2 == null || undefined) inviteTemp2 = "I Do Not Know";
  var ConfigLeaveChannelMessage = db.get(
    `ConfigLeaveChannelMessage_${member.guild.id}.value`
  );
  if (ConfigLeaveChannelMessage == null || undefined)
    ConfigLeaveChannelMessage = `**<@!${member.id}>** has left. He was invited by **${inviteTemp2}**.`;
  if (embed == "on") {
    channel.send(
      new MessageEmbed()
        .setDescription(
          ConfigLeaveChannelMessage.replace(
            "[User Mention]",
            `<@!${member.id}>`
          )
            .replace("[User Tag]", member.tag)
            .replace("[User Id]", member.id)
            .replace("[Guild Count]", member.guild.memberCount)
            .replace("[Guild Name]", member.tag)
            .replace(
              "[Inviter Mention]",
              `<@!${db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)}>`
            )
            .replace(
              "[Inviter Tag]",
              db.get(`Gda_${member.id}_${member.guild.id}.invitedByP`)
            )
            .replace(
              "[Inviter Id]",
              db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)
            )
            .replace(
              "[Inviter Uses]",
              db.get(`Gda_${invierTemp}_${member.guild.id}.all`)
            )
        )
        .setColor(member.displayHexColor)
        .setThumbnail(db.get(`Gda_${member.id}_${member.guild.id}.invitedByA`))
        .setFooter(
          `Invited By: ${db.get(
            `Gda_${member.id}_${member.guild.id}.invitedByP`
          )}`,
          db.get(`Gda_${member.id}_${member.guild.id}.invitedByA`)
        )
        .setTimestamp()
    );
  } else {
    channel.send(
      ConfigLeaveChannelMessage.replace("[User Mention]", `<@!${member.id}>`)
        .replace("[User Tag]", member.tag)
        .replace("[User Id]", member.id)
        .replace("[Guild Count]", member.guild.memberCount)
        .replace("[Guild Name]", member.tag)
        .replace(
          "[Inviter Mention]",
          `<@!${db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)}>`
        )
        .replace(
          "[Inviter Tag]",
          db.get(`Gda_${member.id}_${member.guild.id}.invitedByP`)
        )
        .replace(
          "[Inviter Id]",
          db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`)
        )
        .replace(
          "[Inviter Uses]",
          db.get(`Gda_${invierTemp}_${member.guild.id}.all`)
        )
    );
  }
});

client.on("guildMemberRemove", member => {
  member.guild.members.cache.forEach(user => {
    var invier = db.get(`Gda_${member.id}_${member.guild.id}.invitedBy`);
    if (invier == null || undefined || NaN) return;
    if (invier == member.id) return;
    if (invier == user.id) {
      var check = db.get(`Gda_${user.id}_${member.guild.id}.regular`)
      db.add(`Gda_${user.id}_${member.guild.id}.leaves`, 1);
      if (check == 0) return;
      db.subtract(`Gda_${user.id}_${member.guild.id}.regular`, 1)
    }
  });
});

client.on("guildCreate", guild => {
  guild.members.cache.forEach(user => {
    var check = db.get(`Gda_${user.id}_${guild.id}.all`);
    if (check == null || undefined) return;
    db.set(`Gda_${user.id}_${guild.id}`, {
      invitedBy: 0,
      invitedByP: 0,
      invitedByA: 0,
      regular: 0,
      fack: 0,
      leaves: 0,
      all: 0,
      invitedUrl: 0,
      invites: ["", ""]
    });
  });
  var channel = client.channels.cache.find(c => c.id === "839425543932870667");
  channel.send(
    new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("The Bot Join New Server")
      .setDescription(
        `**Server Name : ${guild.name}
   Server ID: ${guild.id}
   Server Members : ${guild.memberCount}
   Time Created: ${guild.createdAt.toLocaleString()}
   Server Region ${guild.region}
   Server Boosts : ${guild.premiumSubscriptionCount}
  **`
      )
      .setTimestamp()
      .setThumbnail(guild.iconURL())
  );
});

client.login(client.config.token);
