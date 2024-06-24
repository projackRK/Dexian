function findCommon(strs) {
  if (strs.length === 0) return "";
  let minLength = Math.min(...strs.map((str) => str.length));
  let common = "";

  for (let i = 0; i < minLength; i++) {
    let char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        return common;
      }
    }
    common += char;
  }

  return common;
}

console.log(findCommon(["flower", "flow", "flight"]));
console.log(findCommon(["aabbcc", "aabb", "aabbdd"]));
console.log(findCommon(["dog", "racecar", "car"]));
