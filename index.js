const fs = require("fs");
const path = require("path");
const child = require("child_process");

function installDependencies() {
    console.log("Installing dependencies...");
    if (!fs.existsSync("./package.json")) {
        child.execSync("npm init -y", {
            stdio: "inherit"
        });
    }
    child.execSync("npm i discord.js dotenv@16.3.1", {
        stdio: "inherit"
    });
}

function checkDependencies() {
    try {
        const discordPath = path.join("node_modules", "discord.js", "package.json");
        const dotenvPath = path.join("node_modules", "dotenv", "package.json");

        const discordVersion = JSON.parse(fs.readFileSync(discordPath)).version;
        const dotenvVersion = JSON.parse(fs.readFileSync(dotenvPath)).version;

        return discordVersion && dotenvVersion === "16.3.1";
    } catch (err) {
        return false;
    }
}

function main() {
    if (!checkDependencies()) {
        installDependencies();
    } else {
        console.log("Dependencies are already installed.");
    }

    console.log("Hello, World!");
}

main();