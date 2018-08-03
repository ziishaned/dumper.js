# Dump - Die

Dump an object and kill the process in node.js for quick debugging.

## Installation

```bash
npm install dd
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

![dd](https://i.imgur.com/8eYdVN0.png)

## Testing

You can run the tests (ESLint & Mocha) with:

```bash
npm run test
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
