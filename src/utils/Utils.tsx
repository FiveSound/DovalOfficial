function isValidEmail(value: string): boolean {
  const re: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

export function validateEmail(value: string): boolean {
  if (value === "") {
    return false;
  } else {
    return isValidEmail(value);
  }
}

function validatePassword(
  value: string,
  setPasswordError: (error: string) => void
): void {
  if (value.length < 9) {
    setPasswordError("Password must be 9 characters");
  } else {
    setPasswordError("");
  }
}

function validateInput(
  value: string,
  minLength: number,
  setError: (error: string) => void
): void {
  if (value.length < minLength) {
    setError("Invalid Input");
  } else {
    setError("");
  }
}

function calculateAngle(
  coordinates: { latitude: number; longitude: number }[]
): number {
  let startLat: number = coordinates[0].latitude;
  let startLng: number = coordinates[0].longitude;
  let endLat: number = coordinates[1].latitude;
  let endLng: number = coordinates[1].longitude;
  let dx: number = endLat - startLat;
  let dy: number = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function formatDateUX(date: string) {
  return date;
}

export function debounce(func: (...args: any[]) => void, wait: number, immediate: boolean = false): () => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout as ReturnType<typeof setTimeout>);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

   /**
    * Generates a unique ID by combining the current timestamp with a random string.
    * @returns {string} A unique identifier.
    */
   export const generateUniqueId = (): string => {
    const timestamp = Date.now().toString();
    const randomStr = Math.random().toString(36).substr(2, 5); // Generates a random string
    return `${timestamp}-${randomStr}`;
  };

  
const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  calculateAngle,
  formatDateUX,
  debounce
};

export default utils;
