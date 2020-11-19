const withPlusOrMinus = (numberOfCases) => {
  if (numberOfCases === 0) return 0;
  return numberOfCases > 0
    ? `+ ${numberOfCases.toLocaleString()}`
    : `- ${numberOfCases.toLocaleString()}`;
};

export default withPlusOrMinus;
