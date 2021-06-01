const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "config",
    description: "",
    cooldown: 3,
    aliases: ["settings"],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix })
            if (!args[0]) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: ${prefix}config [key] [value]\n🔑 | Keys: \`embed\`, \`welcome_message\`, \`welcome_channel\`, \`leaves_message\`, \`leaves_channel\`, \`fake\`, \`mod_role\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("embed")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                if (!args[1]) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Messing Value: Plase Inter The \`embed\` Value!**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
                if (!args[1].startsWith("on" || "off")) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`embed\` Value Must Be \`on\` or \`off\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigWelcomeChannelEmbed_${message.guild.id}`, { value: args[1] })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`embed\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("welcome_message")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                const argment = message.content.split(' ').slice(2).join(' ')
                if (!argment) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(`**❌ | Messing Value: Plase Inter The \`welcome_message\` Value!\n🔑 | Helpers Values: \`[Inviter Uses]\` \`[Inviter Id]\` \`[Inviter Tag]\` \`[Inviter Mention]\` \`[Guild Name]\` \`[Guild Count]\` \`[User Id]\` \`[User Tag]\` \`[User Mention]\`**`)
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigWelcomeChannelMessage_${message.guild.id}`, { value: argment })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`welcome_message\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("welcome_channel")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                var channel = message.mentions.channels.first() || client.channels.cache.get(args[1]) || client.channels.cache.find(c => c.id === args[1]) || client.channels.cache.find(c => c.name === args[1]);
                if (!channel || channel == null || undefined || NaN) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`welcome_channel\` Value Must Be \`Channel Mention/Id/Name\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigWelcomeChannel_${message.guild.id}`, { value: channel.id });
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`welcome_channel\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("fake")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                if (!args[1]) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`fake\` Value Must Be \`Number\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                if (!isNaN(args)) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`fake\` Value Must Be \`Number\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigFakeTime_${message.guild.id}`, { value: Number(args[1]) });
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`fack\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("mod_role")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR\` Permission To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                var role = message.mentions.roles.first() || client.roles.cache.find(c => c.id === args[1]) || client.roles.cache.find(c => c.name === args[1]);
                if (!role) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`mode_role\` Value Must Be \`Role Name/Id/Mention\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ModRole_${message.guild.id}`, { value: role })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`fack\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("leaves_message")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                const argment = message.content.split(' ').slice(2).join(' ')
                if (!argment) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(`**❌ | Messing Value: Plase Inter The \`leaves_message\` Value!\n🔑 | Helpers Values: \`[Inviter Uses]\` \`[Inviter Id]\` \`[Inviter Tag]\` \`[Inviter Mention]\` \`[Guild Name]\` \`[Guild Count]\` \`[User Id]\` \`[User Tag]\` \`[User Mention]\`**`)
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigLeaveChannelMessage_${message.guild.id}`, { value: argment })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`leaves_message\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else if (args[0].includes("leaves_channel")) {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                var channel = message.mentions.channels.first() || client.channels.cache.get(args[1]) || client.channels.cache.find(c => c.id === args[1]) || client.channels.cache.find(c => c.name === args[1]);
                if (!channel || channel == null || undefined || NaN) return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: The \`leaves_channel\` Value Must Be \`Channel Mention/Id/Name\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
                db.set(`ConfigLeaveChannel_${message.guild.id}`, { value: channel.id });
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: The \`leaves_channel\` Value Has Been Saved To Database!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                })
            } else {
                if (!message.member.hasPermission("ADMINISTRATOR"))
                    return message.lineReply(
                        new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                        .setDescription(
                            `**❌ | Messing Permission: You Need \`ADMINISTRATOR or The Mod Role\` Permissions To Use This Command**`
                        )
                        .setColor("#2F3136")
                        .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                        .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**❌ | Worang Useing: ${prefix}config [key] [value]\n🔑 | Keys: \`embed\`, \`welcome_message\`, \`welcome_channel\`, \`leaves_message\`, \`leaves_channel\`, \`fake\`, \`mod_role\`**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
            } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc