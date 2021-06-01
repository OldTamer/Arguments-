const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "leaderboard",
    description: "",
    cooldown: 3,
    aliases: ["leaderboard"],
    run: (client, message, args) => {
            message.channel.startTyping();
            var prefix = db.get(`Prefix_${message.guild.id}.data`);
            if (prefix == null || undefined || undefined) db.set(`Prefix_${message.guild.id}`, { data: client.config.prefix })
            const usersData = []
            message.guild.members.cache.forEach(user => {
                usersData.push(user)
            })

            var pointsContent = usersData.length;
            let usersContent = 0;
            let usersMaxContent = 21;
            let tempData = [];
            for (let i = 0; i < pointsContent; i++) {
                var regular = db.get(`Gda_${usersData[i].id}_${message.guild.id}.regular`)
                if (regular == null || undefined) continue;
                if (regular == 0) continue;
                var all = db.get(`Gda_${usersData[i].id}_${message.guild.id}.all`)
                if (all == null || undefined) continue;
                var bonus = db.get(`bonus_${usersData[i].id}_${message.guild.id}.value`)
                if (bonus == null || undefined) continue;
                var fake = db.get(`Gda_${usersData[i].id}_${message.guild.id}.fack`)
                if (fake == null || undefined) continue;
                var leaves = db.get(`Gda_${usersData[i].id}_${message.guild.id}.leaves`)
                if (leaves == null || undefined) continue;
                tempData.push({
                    user: usersData[i].user,
                    real: regular,
                    all: all,
                    bonus: bonus,
                    fake: fake,
                    leaves: leaves
                });
            }
            setTimeout(() => {
                const leaderboardData = []
                tempData.sort((a, b) => b.real - a.real);
                tempData.sort((a, b) => b.all - a.all);
                tempData.sort((a, b) => b.bonus - a.bonus);
                tempData.sort((a, b) => b.fake - a.fake);
                tempData.sort((a, b) => b.leaves - a.leaves);
                for (let k = 0; k < tempData.length; k++) {
                    usersContent++
                    if (usersContent >= usersMaxContent) continue;
                    leaderboardData.push(`${k+1}. **<@!${tempData[k].user.id}>** - **${tempData[k].real}** invites (**${tempData[k].all}** reqular, **${tempData[k].bonus}** bonus, **${tempData[k].fake}** fake, **${tempData[k].leaves}** leaves)`)
                }

                var topValue = leaderboardData.join('\n')
                message.lineReply(
                    new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Leaderboard`, message.guild.iconURL({ dynamic: true }))
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor("#2F3136")
                    .setDescription(topValue) // "✅ : real \n♾️ : all \n✨ : bonus \n🤖 : fake\n❌ : leaves  \n\n" +
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
                ).then(() => {
                    message.channel.stopTyping();
                })
            }, 500); // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
        } // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc
}; // All Copyrights Go's To </> NAAR Studio: https://discord.gg/YJ6mUdgTsc