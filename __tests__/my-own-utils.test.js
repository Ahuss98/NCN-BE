const {convertToNestedArray} = require('../my-own-utils')

describe('testing converter util', () => {
    test('should convert a nexted object of objects to a nested array of arrays', () => {
        //arrange
        const object = {name:'ahmed',age:'25',goodAt:'jiu-jitsu'}
        const actualOutput = convertToNestedArray([object])
        const expectedOutput = [ [ [ 'name', 'ahmed' ], [ 'age', '25' ], [ 'goodAt', 'jiu-jitsu' ] ] ]
        //act
        //assert
        expect(actualOutput).toEqual(expectedOutput)
    });
});