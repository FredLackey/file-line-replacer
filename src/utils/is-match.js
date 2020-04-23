const isMatch = (source, target, caseSensitive, matchWhitespace) => {

  let result = null;


  if (caseSensitive && matchWhitespace) {
    result = (source === target);
  }

  if (!caseSensitive && !matchWhitespace) {
    result = (source.trim().toLowerCase() === target.trim().toLowerCase());
  }

  if (!caseSensitive && matchWhitespace) {
    result = (source.toLowerCase() === target.toLowerCase());
  }

  if (caseSensitive && !matchWhitespace) {
    result = (source.trim() === target.trim());
  }

  if (result === true) { 
    return true;
  } if (result === false) {
    return false;
  } 
    throw new Error('Match failure.');
  

};

module.exports = isMatch;
