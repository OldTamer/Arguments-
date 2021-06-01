const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require('../../config');

module.exports = {
    name: "source",
    description: "",
    cooldown: 3,
    aliases: ["source"],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix })
            return message.lineReply(
                    new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dyanmic: true }))
                    .setDescription(
                        `**✅ | Source: [Here](${config.express_url}/src)!.**`
                    )
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ dyanmic: true }))
                ).then(() => {
                    message.channel.stopTyping();
                }) // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc