<h1 align="center">
	<img height="150" src="https://cdn.rawgit.com/ziishaned/dumper.js/master/logo.svg" alt="Dumper.js - Dumps information about a variable" />
	<br> Dumper.js
</h1>
<p align="center">
  <a href="https://travis-ci.org/ziishaned/dumper.js">
		<img src="https://img.shields.io/travis/ziishaned/dumper.js/master.svg?style=flat-square" alt="Build Status">
	</a>
	<a href="https://github.com/ziishaned/dumper.js">
		<img src="https://img.shields.io/codecov/c/github/ziishaned/dumper.js.svg?style=flat-square" alt="Codecov">
	</a>
  <a href="https://twitter.com/home?status=dumper.js%20by%20%40ziishaned%20http%3A//github.com/ziishaned/dumper.js">
    <img src="https://img.shields.io/badge/twitter-tweet-blue.svg?style=flat-square"/>
  </a>
  <a href="https://twitter.com/ziishaned">
    <img src="https://img.shields.io/badge/feedback-@ziishaned-blue.svg?style=flat-square" />
  </a>
	<a href="https://github.com/ziishaned/dumper.js">
		<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License">
	</a>
</p>

<p align="center"><code>dumper.js</code> is a better and pretty variable inspector for your Node.js applications.</p>

## Installation

```bash
npm install --save-dev dumper.js
# or you may use yarn
yarn add dumper.js --dev
```

## Usage

### `dd()` Dump and Die

Calling `dd()` prints the output and kills the process

```js
const { dd } = require('dumper.js');

const users = [
    { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
    { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
    { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
];

dd(users);

// Above variable will be printed
console.log('this will never be called');
```

Will output below result and kill the process

![dd](https://i.imgur.com/iKIel4s.png)

### `dump()` Dump and Continue

Calling `dump()` prints the output and continues with the processing

```javascript
const { dump } = require('dumper.js');

const users = [
    { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
    { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
    { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
];

dump(users);

// Above variable will be printed and the process will continue
console.log('this will be called');
```

Will output below result and continue processing

![dump](https://i.imgur.com/x048cf6.png)

## Contributions

Feel free to submit pull requests, create issues or spread the word.

## License

MIT &copy; [Zeeshan Ahmad](https://twitter.com/ziishaned)
