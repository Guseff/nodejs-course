const decoder = (str, sh) =>
  str
    .split('')
    .map(x => {
      const n = x.charCodeAt(0);
      if (n < 65 || (n > 90 && n < 97) || n > 122) return x;
      if ((n <= 90 && n - sh < 65) || (n > 96 && n - sh <= 96)) {
        return String.fromCharCode(n - sh + 26);
      }
      return String.fromCharCode(n - sh);
    })
    .join('');

module.exports = decoder;
