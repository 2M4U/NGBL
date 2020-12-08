const wump = require("wumpfetch");
const axios = require("axios");
const endpoint = "https://nextgenbots.xyz/api";

class NGBL {
    /**
     * 
     * @param {Number} botid REQUIRED - 16 Characters Discord Bot ID
     * @param {String} token REQUIRED - Your Application Token From NextGenBots.xyz
     */
    constructor(botid, token) {
        this.token = token;
        this.botid = botid;
        this.timeout = 3.6e+6;
        this.ua = "NGBL/1.0 By Pikachilla (CyberCDN)";
    }

    /**
     * 
     * @param {Number} count REQUIRED - Server count.
     * @param {Number} timeout OPTIONAL - Time in Milliseconds *DEFAULTS TO 1HOUR*
     * @param {Boolean} response OPTIONAL - give response if succeded *DEFAULT TO FALSE*.
     */
    async autoPost(count, timeout, response) {
        if (!this.token) {
            throw new TypeError("[Token-Missing]: API token not provided");
        }
        if (!this.botid) {
            throw new Error("[BotID-Missing]: Bot ID must be specified.");
        }
        if (!count) {
            throw new Error("[ServerCount-Missing]: Server count must be specified.");
        }
        if (isNaN(count)) {
            throw new Error("[ServerCount-NaN]: Server count must be a number.");
        }
        if (!timeout) {
            timeout = this.timeout;
        }
        if (isNaN(timeout)) {
            throw new Error("[Timeout-NaN]: Timeout must be a number.");
        }
        if (!response) {
            response = false;
        }

        let token = this.token;
        let ua = this.ua;
        let bot = this.botid;

        setInterval(async function() {

            const res = await wump(`${endpoint}/stats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": ua,
                    "auth": token
                },
                data: {
                    "id": bot,
                    "server_count": count
                }
            }).send();

            if (!res) {
                return console.error(new Error("[Autopost-NGBL]: [Error]: An Error Occurred whilst updating bot statistics."));
            }
            if (response === true) {
                return console.log(`[Autopost-NGBL]: Bot statistics have been updated to Guild Count: ${servercount}`);
            }

        }, timeout);
        return "[Autopost-NGBL]: Initialized!";
    };

    /**
     * 
     * @param {Number} servercount REQUIRED
     */
    manualPost(servercount) {
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
                reject(new Error("[Error]: An Error Occurred whilst updating bot statistics."));
            }
            resolve(`[Success]: Bot statistics have been updated to Guild Count: ${servercount}`);
        });
    };

    /**
     * 
     * @param {Number} botid REQUIRED - 16 Characters Discord Bot ID
     */
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

            const res = await axios(`${endpoint}/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": this.ua,
                    "auth": this.token
                },
                data: {
                    "id": botid,
                }
            });

            if (!res) {
                reject(new Error("[Error]: An Error Occurred Whilst Retrieving The Information!"));
            }

            let result = {
                daily_votes: res.data.daily_votes,
                short_desc: res.data.short_desc,
                prefix: res.data.prefix,
                ownerID: res.data.owner,
                tags: res.data.tags,
                support: res.data.support == null ? "N/A" : `https://discord.gg/${res.data.support}`,
                total_votes: res.data.total_votes,
                guilds: res.data.servers
            };

            resolve(result);
        });
    }
};

module.exports = NGBL;