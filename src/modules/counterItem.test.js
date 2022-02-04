import { itemsCounter } from './counterItems.js';

test('items counter check ', () => {
  const arr = [
    {
      id: 67,
    },
  ];
  const counter = itemsCounter(arr);

  expect(counter).toBe(1);
});

test('items counter check if the there no data ', () => {
  const arr = [];

  const counter = itemsCounter(arr);

  expect(counter).toBe(0);
});

test('items counter check if the there some data ', () => {
  const arr = [1, 4, 89];

  const counter = itemsCounter(arr);

  expect(counter).toBe(3);
});

test('items counter check if not an invalid data ', () => {
  const string = 'invalid data';

  const counter = itemsCounter(string);

  expect(counter).toBe('invalid');
});