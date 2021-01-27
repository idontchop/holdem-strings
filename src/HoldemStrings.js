
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
    compressArray: function (arrayHands) {

        let array = HoldemStrings.verifyArray(arrayHands)
        array = HoldemStrings.expandArray(array)

        // for faster coding
        let r = HoldemStrings.rankOrder
 
        //
        let newArray = []

        // pairs
        let lowest = r.length
        for(let i = r.length-1; i >= 0; i--) {
            if ( array.includes(r[i] + r[i])) {
                if (lowest === i+1) {
                    lowest = i
                }
                else {
                    newArray.push(r[i] + r[i])
                }
            }
        }

        if (lowest < r.length-1) {
            newArray.push("" + r[lowest] + r[lowest] + '+')
        } else if ( lowest === r.length-1) {
            newArray.push("" + r[lowest] + r[lowest])
        }

        // suited, offsuit
        ['o', 's'].forEach( o => {
            
            for (let i = r.length-1; i >= 0; i--) {
                lowest = i
                for ( let s = i-1; s >= 0; s--) {
                    if ( array.includes(r[i] + r[s] + o)) {
                        if (lowest === s+1) {
                            lowest = s
                        } else {
                            newArray.push(r[i] + r[s] + o)
                        }
                    }
                }

                if (lowest < i-1) {
                    newArray.push(r[i] + r[lowest] + o + '+')
                } else if ( lowest === i-1) {
                    newArray.push(r[i] + r[lowest] + o)
                }
            }
        })

        return newArray
    },

    /**
     * Takes a single range such as ATs+ and returns all individual ranges
     * ATs, AJs, AQs, AKs
     * 
     * Returns Array
     * 
     * @param {String} range 
     */
    expandRange: function (range) {
        if (range.length < 3 ||
            range.slice(-1) !== '+' ||
            HoldemStrings.rank(range.charAt(0)) === -1 ||
            HoldemStrings.rank(range.charAt(1)) === -1 ) {
            return [] 
        }

        let a = []
        
        let lastChar = (range.slice(-2,-1) === 'o' || range.slice(-2,-1) === 's') ? range.slice(-2,-1) : "";

        // pairs
        if (range.charAt(0) == range.charAt(1)) {
            for(let i = HoldemStrings.rank(range.charAt(0)); i < HoldemStrings.rankOrder.length; i++) {
                a.push("" + HoldemStrings.rankOrder[i] + HoldemStrings.rankOrder[i])
            }
        } else {
            for ( let i = HoldemStrings.rank(range.charAt(1)); i < HoldemStrings.rank(range.charAt(0)); i++) {
                a.push("" + range.charAt(0) + HoldemStrings.rankOrder[i] + lastChar);
            }
        }

        return a;

    },

    /**
     * Takes Array of hand ranges, expands any that have '+'
     * Removes duplicates.
     * 
     * @param {Array of Strings} arrayHands 
     */
    expandArray: function (arrayHands) {

        let a = new Set()

        arrayHands.forEach( e => {
            if (e.slice(-1) === '+') {
                HoldemStrings.expandRange(e).forEach( i => {
                    a.add(i)
                })
            } else {
                a.add(e)
            }
        })

        return Array.from(a)
    }
    

};

export default HoldemStrings


