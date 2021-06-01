const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "bonus",
    description: "",
    cooldown: 3,
    aliases: [""],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined)
                db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix });
            if (!args[0]) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**❌ | Worang Useing: ${prefix}bonus [key] [value]\n🔑 | Keys: \`add\`, \`remove\`, \`reset\`, \`reset_all\`**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setTimestamp()
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } else if (args[0] === "add") {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                var user =
                    message.mentions.users.first() ||
                    client.users.cache.get(args[1]) ||
                    client.users.cache.find(c => c.id === args[1]) ||
                    client.users.cache.find(c => c.username === args[1]) ||
                    message.author;

                var points = args[2];
                if (!points)
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Worang Useing: The \`add\` Value Must Be \`@user <points>\`\n🛠 | Ex: ${prefix}bonus add <@!${user.id}> 100**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                var check = db.get(`bonus_${user.id}_${message.guild.id}.value`);
                if (check == null || undefined)
                    db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 });
                db.add(`bonus_${user.id}_${message.guild.id}.value`, args[2]);
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**✅ | Data Save: The Bot Added ${points} Bonus Data From <@!${user.id}>!.**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } else if (args[0] === "remove") {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                var user =
                    message.mentions.users.first() ||
                    client.users.cache.get(args[1]) ||
                    client.users.cache.find(c => c.id === args[1]) ||
                    client.users.cache.find(c => c.name === args[1]) ||
                    message.author;

                var points = args[2];
                if (!points)
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Worang Useing: The \`remove\` Value Must Be \`@user <points>\`\n🛠 | Ex: ${prefix}bonus remove <@!${user.id}> 100**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                var check = db.get(`bonus_${user.id}_${message.guild.id}.value`);
                if (check == null || undefined) db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 });
                db.subtract(`bonus_${user.id}_${message.guild.id}.value`, args[2]);
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**✅ | Data Save: The Bot Removed ${points} Bonus Data From <@!${user.id}>!.**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } else if (args[0] === "reset") {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                var user =
                    message.mentions.users.first() ||
                    client.users.cache.get(args[1]) ||
                    client.users.cache.find(c => c.id === args[1]) ||
                    client.users.cache.find(c => c.name === args[1]) ||
                    message.author;

                db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 });
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**✅ | Data Save: <@!${user.id}> Bonus Data Has Been Reseted!.**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } else if (args[0] === "reset_all") {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                message.guild.members.cache.forEach(user => {
                    db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 });
                });
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**✅ | Data Save: All Users Bonus Data Has Been Removed!.**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } else {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                            new MessageEmbed()
                            .setAuthor(
                                message.author.tag,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setDescription(
                                `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                            )
                            .setColor("#2F3136")
                            .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                            .setFooter(
                                `Requested By: ${message.author.tag}`,
                                message.author.avatarURL({ dyanmic: true })
                            )
                            .setTimestamp()
                        )
                        .then(() => {
                            message.channel.stopTyping();
                        });
                message.guild.members.cache.forEach(user => {
                    db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 });
                });
                return message.lineReply(
                        new MessageEmbed()
                        .setAuthor(
                            message.author.tag,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setDescription(
                            `**❌ | Worang Useing: ${prefix}bonus [key] [value]\n🔑 | Keys: \`add\`, \`remove\`, \`reset\`, \`reset_all\`**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(
                            `Requested By: ${message.author.tag}`,
                            message.author.avatarURL({ dyanmic: true })
                        )
                        .setTimestamp()
                    )
                    .then(() => {
                        message.channel.stopTyping();
                    });
            } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc