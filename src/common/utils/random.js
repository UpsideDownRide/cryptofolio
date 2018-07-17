import goodRound from './round'

const [random, floor] = [Math.random, Math.floor]

export const randomNumber = (min=0, max=1, digits=2) => {
    const range = max - min
    return goodRound(range * random() + min, digits)
} 

export const randomElement = (arr) => arr[floor(random() * arr.length)]

