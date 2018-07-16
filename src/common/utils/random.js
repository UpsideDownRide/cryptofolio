const [round, random, floor] = [Math.round, Math.random, Math.floor]

export const goodRound = (num, digits=0) => {
    return Number(round(num + 'e' + digits) + 'e-' + digits)
}

export const randomNumber = (min=0, max=1, digits=2) => {
    const range = max - min
    return goodRound(range * random() + min, digits)
} 

export const randomElement = (arr) => arr[floor(random() * arr.length)]

