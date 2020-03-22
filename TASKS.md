# RS School NodeJS course

You can generate a new repository with the same directory structure and files as an existing repository using GitHub article: [ Creating a repository from a template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

**\*N.B**. This structure is recommended for the implementation tasks starting from the **second**. The first task is not related to subsequent ones.\*

## Task 1. Caesar cipher CLI tool

**Implement CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool should accept 3 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file

**Details:**

1.  For command-line arguments try [https://www.npmjs.com/package/commander](https://www.npmjs.com/package/commander)
2.  If one of the arguments missed - an error should be shown, the process should exit with non-zero status code
3.  If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.
4.  Output file should contain encoded content of input file.
5.  Use only the English alphabet (lower-case), all other characters should be kept untouched.

**Hints:**
As suggested solution to make streams code more robust, and memory effective, consider to use [pipeline method](https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback).
Structure can be the following:

```javascript
pipeline(
  input_stream, // input file stream or stdin stream
  transform_stream, // standard Transform stream or https://github.com/rvagg/through2
  output_stream // output file stream or stdout stream
)
.then(success and error callbacks)
```

**Usage example:**

```bash
$ npm run my_caesar_cli --shift 7 --input plain.txt --output encoded.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
