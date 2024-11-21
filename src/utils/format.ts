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


export const formatDateHourUtil = (fecha: Date, usarUTC: boolean = true): string => {
  let horas: number = usarUTC ? fecha.getUTCHours() : fecha.getHours();
  let minutos: number = usarUTC ? fecha.getUTCMinutes() : fecha.getMinutes();

  const ampm: string = horas >= 12 ? "PM" : "AM";
  horas = horas % 12;
  horas = horas ? horas : 12;
  const horasStr: string = horas.toString().padStart(2, "0");
  const minutosStr: string = minutos.toString().padStart(2, "0");

  return `${horasStr}:${minutosStr} ${ampm}`;
};