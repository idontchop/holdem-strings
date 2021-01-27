const assert = require('assert')
import hs from '../src/HoldemStrings'

describe('HoldemStrings Test', function () {
    
    it('should return ["AA"]', () => {
        assert.deepStrictEqual(hs.verifyArrayWithErrors(["AA","K%"])[0], ['AA'])
    }),
    it('should return ["AKo","T2o","76o","A2o","J5o+"]', () => {
        assert.deepStrictEqual(hs.verifyArrayWithErrors(["KAo","2To","67o","2Ao","5Jo+","TTo"])[0], ["AKo","T2o","76o","A2o","J5o+"])
    }),
    it('should return ', () => {
        assert.deepStrictEqual(hs.expandRange("ATs+"),["ATs", "AJs", "AQs", "AKs"])
    }),
    it('Expand Array', () => {
        assert.deepStrictEqual(hs.expandArray(['ATs+','JJ+','88']),["ATs", "AJs", "AQs", "AKs","JJ", "QQ", "KK", "AA", "88"])
    }),
    it('should return ["TT+"]', () => {
        assert.deepStrictEqual(hs.compressArray(["TT", "JJ", "QQ", "AA", "KK", "TT"]),
        ["TT+"])
    }),
    it('should return ["TT+", "22", "AQo+", "AJs+"]', () => {
        assert.deepStrictEqual(hs.compressArray(["TT", "JJ", "QQ", "AA", "KK", "22", "AQo", "AKo", "AJs", "AQs", "AKs"]),
        ["22","TT+", "AQo+", "AJs+"])
    })
})