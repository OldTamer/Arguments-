const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "reset_data",
    description: "",
    cooldown: 3,
    aliases: ["reset_data"],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix })
            message.lineReply("...")
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
            message.guild.members.cache.forEach(user => {
                db.set(`Gda_${user.id}_${message.guild.id}`, {
                    invitedBy: 0,
                    invitedByP: 0,
                    invitedByA: 0,
                    regular: 0,
                    fack: 0,
                    leaves: 0,
                    all: 0,
                    invitedUrl: 0,
                    invites: ['', ''],
                });
                db.set(`bonus_${user.id}_${message.guild.id}`, { value: 0 })
            });
            return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Data Save: Database Has Been Reseted!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                }) // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc