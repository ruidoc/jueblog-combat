const filterJson = (json, keys) => {
  return Object.fromEntries(
    Object.entries(json).filter(row => keys.includes(row[0]))
  )
}

module.exports = { filterJson }
