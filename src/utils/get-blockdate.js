const getBlockDate = () => {
  const now = new Date();
  return [
    `${now.getFullYear()}`,
    `${now.getMonth() + 1}`.padStart(2, '0'),
    `${now.getDate()}`.padStart(2, '0'),
    `${now.getHours()}`.padStart(2, '0'),
    `${now.getMinutes()}`.padStart(2, '0'),
    `${now.getSeconds()}`.padStart(2, '0'),
    `${now.getMilliseconds()}`.padStart(3, '0'),
  ].join('');
};

module.exports = getBlockDate;
