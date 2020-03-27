const { program } = require('commander');
const fs = require('fs');

const init = () => {
  program
    .option('-i, --input [path]', 'input file name')
    .option('-o, --output [path]', 'output file name')
    .option('-s, --shift <number>', 'shift', parseInt)
    .option('-a, --action <type>', 'encode/decode')
    .parse(process.argv);

  const input = program.input
    ? fs.createReadStream(program.input, {
        flags: 'r+'
      })
    : process.stdin;
  const output = program.output
    ? fs.createWriteStream(program.output, {
        flags: 'r+'
      })
    : process.stdout;
  const shift = program.shift;
  const action = program.action;

  if ((!shift && shift !== 0) || isNaN(shift)) {
    // console.error('Wrong shift parameter!');
    throw 'Wrong shift parameter!';
  }

  if (!action || (action !== 'encode' && action !== 'decode')) {
    throw new Error('Wrong action parameter!');
  }

  return {
    input,
    output,
    shift: shift % 26,
    action
  };
};

module.exports = init;
