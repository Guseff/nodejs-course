// node caesar.js -i './input.txt' -o './output.txt' -s 7 -a encode
const { pipeline } = require('stream');
const through2 = require('through2');

const init = require('./initial');
const decoder = require('./decoder');
const encoder = require('./encoder');

// process.on('exit', code => {
//   console.log(`\nAbout to exit with code: ${code}`);
// });

const settings = init();

const transform = through2((data, enc, cb) => {
  const chunk = data.toString();
  const res =
    settings.action === 'decode'
      ? decoder(chunk, settings.shift)
      : encoder(chunk, settings.shift);
  cb(null, new Buffer.from(res));
});

pipeline(settings.input, transform, settings.output, err => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
