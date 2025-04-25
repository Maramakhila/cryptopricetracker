

  // Example: Enhanced formatNumber in utils.js
export const formatNumber = (num) => {
    if (!num && num !== 0) return "-";
    const absNum = Math.abs(num);
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(Math.log10(absNum) / 3);
    return absNum >= 1000 
      ? `${(num / 10 ** (suffixNum * 3)).toFixed(2)}${suffixes[suffixNum]}` 
      : num.toFixed(2);
  };