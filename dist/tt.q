let i = 1
const f = () => {
  if (i <= 10) {
    require('./safe.js')(i)
    i += 1;
    f();
  }
};
f()
