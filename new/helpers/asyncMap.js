async function asyncMap(arr, func) {
  const lastElem = arr.pop();
  await func(lastElem);
  arr.length > 0 ? await asyncMap(arr, func) : null;
}

module.exports = asyncMap;
