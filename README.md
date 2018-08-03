# Dump - Die
Dump an object and kill the process in node.js for quick debugging.

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment you are required to send us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Installation

```bash
npm install dump-die
```

## Usage

Calling `dd` will print the object in your terminal and kill the process.

```js
const dd = require('dd');

const users = [
    { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
    { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
    { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
];

dd(users);
```

Outputs:

```js

```

## Testing

You can run the tests (ESLint & Mocha) with:

```bash
npm run test
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
