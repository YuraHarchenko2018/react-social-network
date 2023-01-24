const getFormattedDate = (dateTime) => {
  const date = new Date(dateTime)
  const dateTitle = date.toLocaleString('en-GB')
  return dateTitle
}

export default getFormattedDate
