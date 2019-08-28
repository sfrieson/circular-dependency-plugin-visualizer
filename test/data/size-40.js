let files = 0;
let minCircles = 0;
function makeFilename (getFolder, getFile) {
  return (...args) => {
    files++;
    return `${getFolder(...args)}/${getFile(...args)}.js`;
  };
}

function join (a, ...others) {
  return [...a].concat(
    others.reduce((addOn, other) => {
      return [
        ...addOn,
        ...other.slice(1, other.length - 1),
        a[0]
      ];
    }, [])
  );
}

// function rotate (deg, circle) {
//   // Removes the connection to the beginning, a duplicate
//   circle.pop();
//   const percent = deg / 360;
//   const nodeCount = Math.floor(circle.length * percent);
//   const rotated = circle.slice(nodeCount + 1).concat(circle.slice(0, nodeCount));
//   // Reconnect on the first node.
//   rotated.push(rotated[0]);
//   return rotated;
// }

function simpleCircle (size, filename, seed = []) {
  minCircles++;
  const path = [];
  for (var i = 0; i < size; i++) {
    let node = null;
    if (i < seed.length) node = seed[i];
    else node = filename(i);
    path.push(node);
  }
  path.push(path[0]);
  return path;
}

function figure8 (size, filename) {
  return join(
    simpleCircle(size, filename),
    simpleCircle(size, filename)
  );
}

const getLetter = (function * letterGenerator () {
  let num = 1;
  while (num > 0) {
    yield (num++).toString(36);
  }
})();

const uniqueLetter = () => getLetter.next().value;
const getSameLetter = () => {
  const letter = getLetter.next().value;
  return () => letter;
};
const randomLetter10 = () => 'abcdefghij'.split('')[Math.floor(Math.random() * 10)];
const detected = [];

for (let i = 0; i < 10; i++) {
  detected.push(
    simpleCircle(3, makeFilename(randomLetter10, uniqueLetter))
  );
}
for (let i = 0; i < 7; i++) {
  detected.push(
    simpleCircle(2, makeFilename(randomLetter10, uniqueLetter))
  );
}
for (let i = 0; i < 3; i++) {
  detected.push(
    figure8(2, makeFilename(randomLetter10, uniqueLetter))
  );
}

for (let i = 0; i < 2; i++) {
  detected.push(
    figure8(3, makeFilename(randomLetter10, uniqueLetter))
  );
}

detected.push(
  figure8(5, makeFilename(randomLetter10, uniqueLetter))
);
detected.push(
  simpleCircle(10, makeFilename(randomLetter10, uniqueLetter))
);
detected.push(
  simpleCircle(37, makeFilename(getSameLetter(), uniqueLetter))
);
detected.push(join(
  figure8(4, makeFilename(getSameLetter(), uniqueLetter)),
  simpleCircle(10, makeFilename(randomLetter10, uniqueLetter))
));
detected.push(join(
  figure8(4, makeFilename(randomLetter10, uniqueLetter)),
  simpleCircle(10, makeFilename(randomLetter10, uniqueLetter)),
  simpleCircle(7, makeFilename(randomLetter10, uniqueLetter)),
  simpleCircle(4, makeFilename(randomLetter10, uniqueLetter)),
  simpleCircle(5, makeFilename(getSameLetter(), uniqueLetter))
));

(() => {
  const c10 = simpleCircle(10, makeFilename(getSameLetter(), uniqueLetter));
  detected.push(simpleCircle(5, makeFilename(getSameLetter(), uniqueLetter), [c10[5], c10[3]]));
  detected.push(c10);
})();

console.log({ files, minCircles });
module.exports = { detected };
