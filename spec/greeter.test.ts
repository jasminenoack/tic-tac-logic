import {} from 'jasmine'
import { Greeter } from '../src/greeter'

describe('greeter', () => {
  it('should greet', () => {
    const greeter = new Greeter("World")
    expect(greeter.greet()).toEqual("Hello, World")
  })
})
