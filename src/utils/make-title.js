function makeTitle(str) {
  const regex = /.*?(\.)(?=\s[A-Z])/;
  const m = regex.exec(str)
  let title = null

  if (m !== null) {
    title = `${m[0]}`
  }

  return title
}

export default makeTitle
