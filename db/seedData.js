const users = [
  {
    password: 'brettpass',
    email: 'brett@example.com',
    mobile: '1223455',
    name: 'brett',
  },
  {
    password: 'headfirst',
    email: 'keepyourheadonstraight@example.com',
    mobile: '5456546',
    name: 'Kelly',
  },
  {
    password: 'scarykary',
    email: 'dontbefrightened@example.com',
    mobile: '654656',
    name: 'Lucas',
  },
  {
    password: 'test',
    email: 'test@example.com',
    mobile: '87686456',
    name: 'Lucia',
  },
];

const groups = [
  {
    name: 'Group 1',
    maxPrice: 255,
    location: 'Moon',
    date: new Date(),
  },
  {
    name: 'Group 2',
    maxPrice: 255,
    location: 'Sun',
    date: new Date(),
  },
];

const members = [
  {
    email: 'john.doe@example.com',
    mobile: '1223455',
    name: 'John',
  },
  {
    email: 'jenna.doe@example.com',
    mobile: '5456546',
    name: 'Jenna',
  },
  {
    email: 'Foo@example.com',
    mobile: '654656',
    name: 'Foo',
  },
  {
    email: 'bar@example.com',
    mobile: '87686456',
    name: 'Bar',
  },
];

module.exports = {
  users,
  groups,
  members,
};
