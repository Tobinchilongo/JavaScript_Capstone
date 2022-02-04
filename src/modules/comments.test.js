/**
 * @jest-environment jsdom
 */
import { commentCounter } from './commentsDetails.js';

test('items counter check ', () => {
  const arr = [
    {
      id: 11,
      username: '',
      comment: '',
    },
    {
      id: 12,
      username: '',
      comment: '',
    },
  ];
  const counter = commentCounter(arr);

  expect(counter).toBe(2);
});

test('items counter check if num of comments 2', () => {
  const arr = ['nice movie', 'too long'];

  const counter = commentCounter(arr);

  expect(counter).toBe(2);
});

test('items counter check if data is invalid ', () => {
  const string = 'test';

  const counter = commentCounter(string);

  expect(counter).toBe('invalid');
});
