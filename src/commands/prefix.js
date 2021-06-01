const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "set-prefix",
    description: "",
    cooldown: 3,
    aliases: ["prefix"],
    run: (client, message, args) => {
            message.channel.startTyping();
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.react('❌')
            }
            if (!args[0]) {
                return message.lineReply(
                    new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                    .setColor("RED")
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setDescription(`**❌ | Error: Please Type The Prefix**`)
                ).then(() => {
                    message.channel.stopTyping();
                })
            }
            if (args[0].length > 5) {
                return message.lineReply(
                    new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                    .setColor("RED")
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setDescription(`**❌ | Error: This Prefix Is Too Long**`)
                ).then(() => {
                    message.channel.stopTyping();
                })
            }
            message.react('✅')
            db.set(`Prefix_${message.guild.id}`, { data: args[0] })
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc