import { getSelectionByRoll, sortArrayByProperty } from '../classUtils.js';

// test sortArrayByProperty()
describe('sort simple arrays of objects', () => {
  it('sort array 1-5', () => {
    const arr1 = [
      { timeStart: 1 },
      { timeStart: 5 },
      { timeStart: 3 },
      { timeStart: 2 },
      { timeStart: 4 },
    ];

    const arr1Expected = [
      { timeStart: 1 },
      { timeStart: 2 },
      { timeStart: 3 },
      { timeStart: 4 },
      { timeStart: 5 },
    ];

    const sorted = sortArrayByProperty(arr1, 'timeStart');
    expect(sorted).toStrictEqual(arr1Expected);
  });

  it('sort array 1-5 with null', () => {
    const arr1 = [
      { timeStart: 1 },
      { timeStart: 5 },
      { timeStart: 3 },
      { timeStart: 2 },
      { timeStart: 4 },
      { timeStart: null },
    ];

    const arr1Expected = [
      { timeStart: null },
      { timeStart: 1 },
      { timeStart: 2 },
      { timeStart: 3 },
      { timeStart: 4 },
      { timeStart: 5 },
    ];

    const sorted = sortArrayByProperty(arr1, 'timeStart');
    expect(sorted).toStrictEqual(arr1Expected);
  });
});

// test getSelectionByRoll()
describe('test that roll loads selection in right order', () => {
  const eventlist = [
    {
      id: 1,
      timeStart: 0,
      timeEnd: 10,
      isPublic: false,
    },
    {
      id: 2,
      timeStart: 10,
      timeEnd: 20,
      isPublic: true,
    },
    {
      id: 3,
      timeStart: 20,
      timeEnd: 30,
      isPublic: false,
    },
    {
      id: 4,
      timeStart: 30,
      timeEnd: 40,
      isPublic: false,
    },
    {
      id: 5,
      timeStart: 40,
      timeEnd: 50,
      isPublic: true,
    },
    {
      id: 6,
      timeStart: 50,
      timeEnd: 60,
      isPublic: false,
    },
    {
      id: 7,
      timeStart: 60,
      timeEnd: 70,
      isPublic: true,
    },
    {
      id: 8,
      timeStart: 70,
      timeEnd: 80,
      isPublic: false,
    },
  ];

  it('if timer is at 0', () => {
    const now = 0;
    const expected = {
      nowIndex: 0,
      nowId: 1,
      publicIndex: null,
      nextIndex: 1,
      publicNextIndex: 1,
      timers: {
        _finishAt: 10,
        _startedAt: 0,
        current: 10,
        duration: 10,
      },
      timeToNext: 10,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 15', () => {
    const now = 15;
    const expected = {
      nowIndex: 1,
      nowId: 2,
      publicIndex: 1,
      nextIndex: 2,
      publicNextIndex: 4,
      timers: {
        _finishAt: 20,
        _startedAt: 10,
        current: 5,
        duration: 10,
      },
      timeToNext: 5,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 20', () => {
    const now = 20;
    const expected = {
      nowIndex: 2,
      nowId: 3,
      publicIndex: 1,
      nextIndex: 3,
      publicNextIndex: 4,
      timers: {
        _startedAt: 20,
        _finishAt: 30,
        current: 10,
        duration: 10,
      },
      timeToNext: 10,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 49', () => {
    const now = 49;
    const expected = {
      nowIndex: 4,
      nowId: 5,
      publicIndex: 4,
      nextIndex: 5,
      publicNextIndex: 6,
      timers: {
        _startedAt: 40,
        _finishAt: 50,
        current: 1,
        duration: 10,
      },
      timeToNext: 1,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 63', () => {
    const now = 63;
    const expected = {
      nowIndex: 6,
      nowId: 7,
      publicIndex: 6,
      nextIndex: 7,
      publicNextIndex: null,
      timers: {
        _startedAt: 60,
        _finishAt: 70,
        current: 7,
        duration: 10,
      },
      timeToNext: 7,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 75', () => {
    const now = 75;
    const expected = {
      nowIndex: 7,
      nowId: 8,
      publicIndex: 6,
      nextIndex: null,
      publicNextIndex: null,
      timers: {
        _startedAt: 70,
        _finishAt: 80,
        current: 5,
        duration: 10,
      },
      timeToNext: null,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });

  it('if timer is at 100', () => {
    const now = 100;
    const expected = {
      nowIndex: null,
      nowId: null,
      publicIndex: null,
      nextIndex: null,
      publicNextIndex: null,
      timers: null,
      timeToNext: null,
    };

    const state = getSelectionByRoll(eventlist, now);
    expect(state).toStrictEqual(expected);
  });
});