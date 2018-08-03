const dd = require('./lib/dd');

const users = [
    { user: 'barney', age: 36, active: true, createdAt: new Date(), getAge: () => this.age },
    { user: 'fred', age: 40, active: false, createdAt: new Date(), getAge: () => this.age },
    { user: 'pebbles', age: 1, active: true, createdAt: new Date(), getAge: () => this.age }
];

dd(users);