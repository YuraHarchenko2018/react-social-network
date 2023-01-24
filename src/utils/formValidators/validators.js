// Rules Fabric
const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Max length limit - ${maxLength}`
  }
  return undefined
}

// Rules
export const required = (value) => (value ? undefined : 'Required')
export const maxLength50 = maxLengthCreator(50)
export const maxLength100 = maxLengthCreator(100)
export const maxLength1000 = maxLengthCreator(1000)
export const maxLength2000 = maxLengthCreator(2000)

// helper
export const composeValidators = (...validators) => {
  const closure = (value) => {
    const reduceFunc = (error, validator) => error || validator(value)
    return validators.reduce(reduceFunc, undefined)
  }
  return closure
}
