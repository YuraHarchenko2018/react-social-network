const generateStatus = () => {
  let result = ''

  const smiles = '😀😁😆😈😘😍😉🥰😋😅😑😇🥱🥲🤒😂🤣🙃🤡😊😎🤬🙂🤗🤭'
  const smilesLength = smiles.length - 1

  for (let i = 0; i < 6; i += 1) {
    let randomNumber = Math.floor(Math.random() * smilesLength)
    randomNumber = (randomNumber % 2) ? randomNumber + 1 : randomNumber
    result += smiles[randomNumber] + smiles[randomNumber + 1]
  }

  return result
}

export default generateStatus
