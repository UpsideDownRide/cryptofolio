export const goodRound = (num, digits=0) => {
    return Number(Math.round(num + 'e' + digits) + 'e-' + digits)
}

export default goodRound