[![npm installinfo](https://nodei.co/npm/ngbl.png?downloads=true&stars=true)](https://www.npmjs.com/package/ngbl)<br>
[![npm version](https://img.shields.io/npm/v/ngbl.svg)](https://www.npmjs.com/package/ngbl)
[![npm downloads](https://img.shields.io/npm/dt/ngbl.svg)](https://www.npmjs.com/package/ngbl)


The Official API Module For **NextGenBots.xyz** in JavaScript.
#### Installation

Using **npm**

`npm i ngbl`

Using **yarn**

`yarn add ngbl`
<hr>

#### Methods
- `.manualPost()`
- `.autoPost()`
- `.botInfo()`
- *More coming soon*
<hr>

#### Example(s)

Methods usage:
```js
const NGB = require('ngbl');
const api = new NGB('BOT_ID','API_KEY');
```

-  `.manualPost()`

```js
api.manualPost('SERVER_COUNT').then(console.log);
```

-  `.autoPost()`

*Time is OPTIONAL, it will default to 1 hour*

*Response is OPTIONAL, it will default to FALSE*

```js
api.autoPost('SERVER_COUNT','TIME_IN_MS', 'RESPONSE').then(console.log);
```

-  `.botInfo()`

```js
api.botInfo('BOT_ID').then(console.log);
```

#### Botinfo Example


```js
const NGB = require('ngbl');
module.exports.run = async (client, message, args) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    let res = api.botInfo(args[0]);
    console.log(res)
    message.channel.send(res);
};
```

#### Auto Post Example

*This will post ever HOUR (3.6e+6 = 1hour in milliseconds)*

*Time is OPTIONAL, it will default to 1 hour*

*Response is OPTIONAL, it will default to FALSE*

```js
const NGB = require('ngbl');
module.exports = (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    api.autoPost(client.guilds.cache.size, 3.6e+6, true).then((r) => {
        console.log(r);
    }).catch((err) => {
        console.log(err);
    });
};
```

```js
const NGB = require('ngbl');
module.exports = async (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    let res = await api.autoPost(client.guilds.cache.size, 3.6e+6, true);
    console.log(res);
};
```

#### Manual Post Example

```js
const NGB = require('ngbl');
module.exports = (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    api.manualPost(client.guilds.cache.size).then((r) => {
        console.log(r);
    }).catch((err) => {
        console.log(err);
    });
};
```

```js
const NGB = require('ngbl');
module.exports = async (client) => {
    const api = new NGB(client.user.id, "EXAMPLE");
    let res = await api.manualPost(client.guilds.cache.size);
    console.log(res);
};
```