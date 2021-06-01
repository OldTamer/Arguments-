const { MessageEmbed } = require("discord.js");
const inlinereply = require("discord-reply");
const db = require("quick.db");

module.exports = {
    name: "help",
    description: "",
    cooldown: 3,
    aliases: ["help"],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined)
                db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix });
            return message.lineReply(
                    new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.avatarURL({ dyanmic: true })
                    )
                    .setDescription(`**💌 | Invites Manager: Help List!.**`)
                    .setColor("#2F3136")
                    .setThumbnail(message.author.avatarURL({ dyanmic: true }))
                    .addFields({
                        name: `${prefix}invites`,
                        value: `to show your information, for more type ${prefix}invites fetch`,
                        inline: true
                    }, {
                        name: `${prefix}settings`,
                        value: "to contole the bot settings like welocme message and more",
                        inline: true
                    }, {
                        name: `${prefix}bonus`,
                        value: "to give or remove your self of sameone else bonus points",
                        inline: true
                    }, {
                        name: `${prefix}reset_data`,
                        value: "to delete all the guild data from the database ( fix all data errors )",
                        inline: true
                    }, {
                        name: `${prefix}prefix`,
                        value: "to change the bot prefix for your guild",
                        inline: true
                    }, {
                        name: `${prefix}leaderboard`,
                        value: "to see top 10 of guild invites",
                        inline: true
                    }, {
                        name: `${prefix}reset_invites`,
                        value: `reset_invites for anyuser, if you type ${prefix}reset_invites all to reset all users invites`,
                        inline: true
                    }, {
                        name: `${prefix}ping`,
                        value: "to see your ping",
                        inline: true
                    }, {
                        name: `${prefix}source`,
                        value: "give's you the bot source code",
                        inline: true
                    })
                    .setFooter(
                        client.user.username,
                        client.user.avatarURL({ dyanmic: true })
                    )
                )
                .then(() => {
                    message.channel.stopTyping();
                }); // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc