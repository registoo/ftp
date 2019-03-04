async function asyncMap(arr, func) {
  // удаляет первый элемент из массива и далее вызывает остаток
  // и применяет к нему переданную функцию
  const last = arr.shift();
  if (last) {
    await func(last);
    await asyncMap(arr, func);
  }
}

module.exports = asyncMap;
