### Task 1. Caesar cipher CLI tool
https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool

To run the application from this directory print:
```bash
$ node caesar.js
```
To run from another directory use entire path.

CLI tool accepts 4 options (short alias or full name):

1.  **-i, --input**: an input file
2.  **-o, --output**: an output file
3.  **-s, --shift**: a shift (required)
4.  **-a, --action**: an action encode/decode (required)

If the input file is missed you can print an input string from keyboard. Then press ENTER for encoding / decoding. After encoding / decoding the next string can be printed. To exit the app press Ctrl+C.

If the output file is missed an output string will be printed in command line.

Shift must be a non-negative number (may be not decimal, for example 0x11). If shift is 0, input and output strings will be equal.

Action must be one of 'encode' or 'decode' string.

First commented line in **caesar.js** is a command string example. Could be copied and pasted in command line. To check the application exit code you could uncomment lines 9-11 in **caesar.js** file.

**Usage example:**

```bash
$ node caesar.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node caesar.js --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node caesar.js --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`