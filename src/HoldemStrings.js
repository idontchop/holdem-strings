
const HoldemStrings = {

    rankOrder: ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
    rank: (rankCharacter) => HoldemStrings.rankOrder.indexOf(rankCharacter),
    rankRegex: /^([akqjt0-9])(?!\1)[akqjt0-9]([os]\+?){1}$|^([akqjt0-9])\3$/gmi, 
    // matches: "TT", "AKo", "AKs+","KAo+" (last could be error), doesn't match: "22+" "22o" "TTo" "TTo+", "AK"
    
    /**
     * Verifies array, returns a new array minus any bad strings.
     * 
     * @param {Array of hand Strings} arrayHands 
     */
    verifyArray: function (arrayHands) {
        return this.verifyArrayWithErrors(arrayHands)[0]
    },

    /**
     * Verifies array, returns, a new array minus any bad strings.
     * 
     * Bad strings are returns in second array.
     * 
     * Returns: [[],[]]
     * @param {array of hand Strings} arrayHands 
     */
    verifyArrayWithErrors: function (arrayHands) {

        // strip malformed
        let goodArray = arrayHands.filter( e => e.match(this.rankRegex))
        let badArray = arrayHands.filter(e => !e.match(this.rankRegex))

        // reorder
        goodArray = goodArray.map( e => {
            if (this.rank(e.charAt(0)) < 
                    this.rank(e.charAt(1))) {
                        // first rank should be greater than second
                        return e.charAt(1) + e.charAt(0) + e.substring(2)
                    }
            return e
        })

        return [goodArray, badArray]
    },

    /**
     * Receives an array of strings representing a hand or hand range
     * and returns a compressed string with ranges and hands seperated by
     * commas.
     * 
     * ['AA', 'KK'] = "KK+"
     * 
     * @param {array of strings} arrayHands 
     */
    compressString: function (arrayHands) {

    }

};

export default HoldemStrings


