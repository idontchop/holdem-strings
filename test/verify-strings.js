const assert = require('assert')
import hs from '../src/HoldemStrings'

describe('hs.verifyArrayWithErrors', function () {
    
    it('should return ["AA"]', () => {
        assert.deepStrictEqual(hs.verifyArrayWithErrors(["AA","K%"])[0], ['AA'])
    }),
    it('should return ["AKo","T2o","76o","A2o","J5o+"]', () => {
        assert.deepStrictEqual(hs.verifyArrayWithErrors(["KAo","2To","67o","2Ao","5Jo+","TTo"])[0], ["AKo","T2o","76o","A2o","J5o+"])
    }),
    it('should return ["TT+", "22", "AQo+", "AJs+"]', () => {
        assert.deepStrictEqual(hs.compressString(["TT", "JJ", "QQ", "JJ", "TT", "22", "AQo", "AKo", "AJs", "AQs", "AKs"])[0],
        ["TT+", "22", "ATo+", "ATs+"])
    })
})