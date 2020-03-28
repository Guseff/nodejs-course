const { program } = require('commander');
const fs = require('fs');

const init = () => {
  program
    .option('-i, --input [path]', 'input file name')
    .option('-o, --output [path]', 'output file name')
    .option('-s, --shift <number>', 'shift', parseInt)
    .option('-a, --action <type>', 'encode/decode')
    .parse(process.argv);

  const shift = program.shift;
  const action = program.action;

  if ((!shift && shift !== 0) || isNaN(shift) || shift < 0) {
    throw new Error('Wrong shift parameter!');
  }

  if (!action || (action !== 'encode' && action !== 'decode')) {
    throw new Error('Wrong action parameter!');
  }

  let input;
  let output;

  if (!program.input) {
    input = process.stdin;
  } else {
    try {
      // eslint-disable-next-line no-sync
      fs.accessSync(program.input, fs.constants.F_OK || fs.constants.R_OK);
      input = fs.createReadStream(program.input, {
        flags: 'r+'
      });
    } catch (err) {
      throw new Error(`${err} when input file open`);
    }
  }

  if (!program.output) {
    output = process.stdout;
  } else {
    try {
      // eslint-disable-next-line no-sync
      fs.accessSync(program.output, fs.constants.R_OK || fs.constants.W_OK);
      output = fs.createWriteStream(
        program.output,
        {
          flags: 'a'
        },
        'utf8'
      );
    } catch (err) {
      throw new Error(`${err} when output file open`);
    }
  }

  return {
    input,
    output,
    shift: shift % 26,
    action
  };
};

module.exports = init;
