export const padNumber = (number, length, character="0", decimals=false, direction="right") => {
    if (decimals) {
        let [int, decim] = String(number).split('.')
        decim = decim ? decim : ''
        const paddedDecimal = padNumber(decim, length, character, false, direction)
        return `${int}.${paddedDecimal}`
    }
    else {
        if (direction==="right") return String(number).padEnd(length, character)
        else if (direction==="left") return String(number).padEnd(length, character)
        else throw "Invalid direction"
    }
}

export const padDecimal = (number, length, character="0") => {
    return padNumber(number, length, character, true, "right")
}