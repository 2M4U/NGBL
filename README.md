[![npm installinfo](https://nodei.co/npm/ngbl.png?downloads=true&stars=true)](https://www.npmjs.com/package/ngbl)<br>
[![npm version](https://img.shields.io/npm/v/ngbl.svg?maxAge=3600)](https://www.npmjs.com/package/ngbl)
[![npm downloads](https://img.shields.io/npm/dt/ngbl.svg?maxAge=3600)](https://www.npmjs.com/package/ngbl)


The Official API Module For **NextGenBots.xyz** in JavaScript.
#### Installation

Using **npm**

`npm i ngbl`

Using **yarn**

`yarn add ngbl`
<hr>

#### Methods
- .updateStats()
- .botInfo()
- *More coming soon*
<hr>

#### Example(s)

Methods usage:
```js
const NGB = require('ngbl');
const api = new NGB('BOT_ID','API_KEY');
```

-  .updateStats()
```js
api.updateStats('SERVER_COUNT').then(console.log);
```

#### Basic Example

```js
const NGB = require('ngbl');
module.exports = (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    api.updateStats(client.guilds.cache.size).then((r) => {
        console.log(r);
    }).catch((err) => {
        console.log(err);
    });
};
```

**__OR__**

```js
const NGB = require('ngbl');
module.exports = async (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    let res = await api.updateStats(client.guilds.cache.size);
    console.log(res);
};
```