

export const generateOrderNumbersArray = (limit) => {
    let numbersArray = []
    for (let i = 1; i <= limit; i++) numbersArray.push(i)
    return numbersArray
}