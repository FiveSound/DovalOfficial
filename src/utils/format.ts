export const formatMilesAndMillions = (num?: number) => {
  if (typeof num !== 'number') {
    console.warn(`Expected a number, but received ${typeof num}.`);
    return 'N/A';
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
};

export const formatPrice = (num: number) => {
  const parsedNum = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsedNum)) {
    throw new Error('Invalid number');
  }

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parsedNum);
};
