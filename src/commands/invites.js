const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "invites",
        description: "",
        cooldown: 3,
        aliases: ["rank", "info"],
        run: (client, message, args) => {
                message.channel.startTyping();
                var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
                var prefix = db.get(`Prefix_${message.guild.id}.data`);
                var regular = db.get(`Gda_${user.id}_${message.guild.id}.regular`);
                var fack = db.get(`Gda_${user.id}_${message.guild.id}.fack`);
                var inviter = db.get(`Gda_${user.id}_${message.guild.id}.invitedBy`);
                var all = db.get(`Gda_${user.id}_${message.guild.id}.all`);
                var leaves = db.get(`Gda_${user.id}_${message.guild.id}.leaves`);
                var bonus = db.get(`bonus_${user.id}_${message.guild.id}.value`);
                if (bonus == null) bonus = 0;
                if (prefix == null || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix });
                if (!args[1]) {
                    if (regular == null || undefined || fack == null || undefined || inviter == null || undefined || all == null || undefined) {
                        db.set(`Gda_${user.id}_${message.guild.id}`, {
                            invitedBy: 0,
                            invitedByP: 0,
                            invitedByA: 0,
                            regular: 0,
                            fack: 0,
                            leaves: 0,
                            all: 0,
                            invitedUrl: 0,
                            invites: []
                        });
                        message.lineReply(
                                new MessageEmbed()
                                .setColor("#2F3136")
                                .setAuthor(user.username, user.avatarURL({ dynamic: true }))
                                .setDescription(`You have **${regular}** invites! (**${all} **regular, **${bonus}** bonus, **${fack} ** fake, **${leaves} ** leaves)`)
                                .setFooter(`Invited By: ${db.get(`Gda_${user.id}_${message.guild.id}.invitedByP`)}`, db.get(`Gda_${user.id}_${message.guild.id}.invitedByA`))
                                .setTimestamp()
                        ).then(() => {
                            message.channel.stopTyping();
                        })
                        return;
                    }
                    message.lineReply(
                            new MessageEmbed()
                            .setColor("#2F3136")
                            .setDescription(`You have **${regular}** invites! (**${all} **regular, **${bonus}** bonus, **${fack} ** fake, **${leaves} ** leaves)`)
                            .setFooter(`Invited By: ${db.get(`Gda_${user.id}_${message.guild.id}.invitedByP`)}`, db.get(`Gda_${user.id}_${message.guild.id}.invitedByA`))
                            .setTimestamp()
                    ).then(() => {
                        message.channel.stopTyping();
                    })
                }
                if (args[1] == "fetch") {
                    message.lineReply(
                            new MessageEmbed()
                            .setColor("#2F3136")
                            .setDescription(`You have invited **${db.get(`Gda_${user.id}_${message.guild.id}.invites`)}**`)
                .setFooter(`Invited By: ${db.get(`Gda_${user.id}_${message.guild.id}.invitedByP`)}`, db.get(`Gda_${user.id}_${message.guild.id}.invitedByA`))
                .setTimestamp()
).then(() => {
    message.channel.stopTyping();
})
        }// All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
    }// All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
};// All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc