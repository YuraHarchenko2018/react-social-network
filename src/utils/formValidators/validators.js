
// Rules Fabric
const maxLenghtCreator = maxLength => value => {
    if (value && value.length > maxLength) {
        return 'Max length limit - ' + maxLength
    }
    return undefined
}

// Rules
export const required = value => (value ? undefined : 'Required')
export const maxLenght10 = maxLenghtCreator(10)
export const maxLenght30 = maxLenghtCreator(30)
export const maxLenght50 = maxLenghtCreator(50)
export const maxLenght240 = maxLenghtCreator(240)
export const maxLenght1000 = maxLenghtCreator(1000)

// helper
export const composeValidators = (...validators) => value => {
    return validators.reduce((error, validator) => error || validator(value), undefined)
}
