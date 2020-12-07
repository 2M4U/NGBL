const wump = require("wumpfetch");
const endpoint = "https://nextgenbots.xyz/api/";

class NGBL {
    constructor(botid, token) {
        this.token = token;
        this.botid = botid;
        this.ua = "NGBL/1.0 By Pikachilla (CyberCDN)";
    }

    updateStats(servercount) {
        if (!this.token) {
            throw new TypeError("[Token-Missing]: API token not provided");
        }
        if (!this.botid) {
            throw new Error("[BotID-Missing]: Bot ID must be specified.");
        }
        if (!servercount) {
            throw new Error("[ServerCount-Missing]: Server count must be specified.");
        }
        if (isNaN(servercount)) {
            throw new Error("[ServerCount-NaN]: Server count must be a number.");
        }
        return new Promise(async(resolve, reject) => {

            const res = await wump(`${endpoint}/stats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": this.ua,
                    "auth": this.token
                },
                data: {
                    "id": this.botid,
                    "server_count": servercount
                }
            }).send();
            if (!res) {
                reject(new Error("[Error]: Bot statistics failed to update."));
            }
            resolve(`[Success]: Bot statistics have been updated to Guild Count: ${servercount}`);
        });
    }

    botInfo(botid) {
        if (!this.token) {
            throw new TypeError("[Token-Missing]: API token not provided");
        }
        if (!botid) {
            throw new Error("[BotID-Missing]: Bot ID must be specified.");
        }
        if (isNaN(botid)) {
            throw new Error("[BotID-NaN]: Bot ID must be a number.");
        }
        return new Promise(async(resolve, reject) => {

            const res = await wump(`${endpoint}/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": this.ua,
                    "auth": this.token
                },
                data: {
                    "id": botid,
                }
            }).send();
            if (!res) {
                reject(new Error("[Error]: An Occurd Whilst Retrieving The Information!"));
            }
            resolve(res);
        });
    }
};

module.exports = NGBL;