module.exports = function (...functions) {
  const fns = functions.filter(fn => typeof fn === 'function');
  return function (...args) {
    fns.forEach(fn => fn.apply(null, args));
  };
};
