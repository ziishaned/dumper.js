<div align="center">
	<img src="https://i.imgur.com/JgbF61K.png" alt="dd() - Dump information about a variable">
	<br/><br/>
	<a href="https://travis-ci.org/zeeshanu/git-profile">
		<img src="https://img.shields.io/travis/zeeshanu/git-profile/master.svg?style=flat-square" alt="Build Status">
	</a>
	<a href="#">
		<img src="https://img.shields.io/teamcity/coverage/bt428.svg?style=flat-square" alt="TeamCity CodeBetter Coverage">
	</a>
	<a href="https://github.com/zeeshanu/git-profile/releases">
		<img src="https://img.shields.io/github/release/zeeshanu/git-profile.svg?style=flat-square" alt="Latest Version">
	</a>
	<a href="#">
		<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License">
	</a>
	<br/><br/>
</div>

> `dumper.js` is a better and pretty variable inspector for your Node applications.

## Installation

```bash
npm install --save dumper.js
# or you may use yarn
yarn add dumper.js
```

## Usage

### `dd()` Dump and Die

Calling `dd()` prints the output and kills the process

```js
const dd = require('dumper.js');

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

![dd1](https://i.imgur.com/8eYdVN0.png)

### `dump()` Dump and Continue

Calling `dump()` prints the output and continues with the processing

```javascript
const dump = require('dumper.js').dump;

const users = [
    { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
    { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
    { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
];

dump(users);

// Above variable will be printed and process will continue
console.log('this *will* be called');
```

Will output below result and continue processing

![dd1](https://i.imgur.com/8eYdVN0.png)

## Contributions

Feel free to submit pull requests, create issues or spread the word.

## License

MIT &copy; [Zeeshan Ahmed](https://twitter.com/zeeshanu)
