<h1 align="center">
	<img height="150" src="https://cdn.rawgit.com/ziishaned/dumper.js/master/logo.svg" alt="Dumper.js - Dumps information about a variable" />
	<br> Dumper.js
</h1>
<p align="center">
  <a href="https://travis-ci.org/ziishaned/dumper.js">
		<a href="https://opencollective.com/dumperjs" alt="Financial Contributors on Open Collective"><img src="https://opencollective.com/dumperjs/all/badge.svg?label=financial+contributors" /></a> <img src="https://img.shields.io/travis/ziishaned/dumper.js/master.svg" alt="Build Status">
	</a>
	<a href="https://github.com/ziishaned/dumper.js">
		<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License">
	</a>
</p>
<p align="center">
  <a href="https://twitter.com/ziishaned">
    <img src="https://img.shields.io/twitter/follow/ziishaned.svg?style=social" />
  </a>
  <a href="https://github.com/ziishaned">
    <img src="https://img.shields.io/github/followers/ziishaned.svg?label=Follow%20%40ziishaned&style=social" />
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

Will output below result and kill the process. [Demo](https://runkit.com/ziishaned/5cc95de6c01d42001ae5eed5)

![dd](https://i.imgur.com/iKIel4s.png)

### `dump()` Dump and Continue

Calling `dump()` prints the output and continues with the processing

```js
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

Will output below result and continue processing. [Demo](https://runkit.com/ziishaned/5cc95f368838bf001bb9a6b1)

![dump](https://i.imgur.com/x048cf6.png)

## Contributions

Feel free to submit pull requests, create issues or spread the word.

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/ziishaned/dumper.js/graphs/contributors"><img src="https://opencollective.com/dumperjs/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/dumperjs/contribute)]

#### Individuals

<a href="https://opencollective.com/dumperjs"><img src="https://opencollective.com/dumperjs/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/dumperjs/contribute)]

<a href="https://opencollective.com/dumperjs/organization/0/website"><img src="https://opencollective.com/dumperjs/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/1/website"><img src="https://opencollective.com/dumperjs/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/2/website"><img src="https://opencollective.com/dumperjs/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/3/website"><img src="https://opencollective.com/dumperjs/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/4/website"><img src="https://opencollective.com/dumperjs/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/5/website"><img src="https://opencollective.com/dumperjs/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/6/website"><img src="https://opencollective.com/dumperjs/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/7/website"><img src="https://opencollective.com/dumperjs/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/8/website"><img src="https://opencollective.com/dumperjs/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/dumperjs/organization/9/website"><img src="https://opencollective.com/dumperjs/organization/9/avatar.svg"></a>

## License

MIT &copy; [Zeeshan Ahmad](https://twitter.com/ziishaned)
