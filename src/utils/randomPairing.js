function extractRandomElement(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}

function randomPairing(names) {
  const a = names.slice(0);
  const b = names.slice(0);
  const result = [];
  while (a.length > 1) {
    const i = extractRandomElement(a);
    let j = extractRandomElement(b);

    while (i === j) {
      b.push(j);
      j = extractRandomElement(b);
    }
    i.giftTo = j.name;
    result.push(i);
  }

  if (a[0] === b[0]) {
    a[0].giftTo = result[0].giftTo;
    result.push(a[0]);
    result[0].giftTo = a[0].name;

    // result.push({ a: a[0], b: result[0].b });
    // [result[0].b] = a;
  } else {
    a[0].giftTo = b[0].name;
    result.push(a[0]);
    // result.push({ a: a[0], b: b[0] });
  }

  return result;
}

module.exports = randomPairing;
