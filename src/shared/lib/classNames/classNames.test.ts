import { classNames } from './classNames'

describe('classNames', () => {
  test('with only one params', () => {
    expect(classNames('example')).toBe('example')
  })

  test('with additional class', () => {
    expect(classNames('example', {}, ['additional'])).toBe('example additional')
  })

  test('with mods', () => {
    const expected = 'example additional1 additional2 hovered'
    expect(classNames('example', { hovered: true }, ['additional1', 'additional2'])).toBe(expected)
  })

  test('with mods false', () => {
    const expected = 'example additional1 additional2 lalala'
    expect(classNames('example', { hovered: false, lalala: true }, ['additional1', 'additional2'])).toBe(expected)
  })
})
