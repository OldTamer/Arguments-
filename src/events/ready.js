const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async client => {
    console.log(
        chalk.yellow(figlet.textSync("Argument 🎈", { horizontalLayout: "full" }))
    );
    await console.log(
        chalk.red.bold(client.user.tag) + chalk.blue.bold(" Is Ready")
    );
    await client.user.setActivity(`${require('../../config').prefix}help`);
    await client.user.setStatus("idle");
};