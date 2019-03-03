async function asyncMap(arr, func) {
  const last = arr.shift();
  if (last) {
    await func(last);
    await asyncMap(arr, func);
  }
}

module.exports = asyncMap;
