const ListBank = [
  {
    label: "Banco de Reservas (Banreservas)",
    value: "Banco de Reservas (Banreservas)",
  },
  { label: "Banco Popular Dominicano", value: "Banco Popular Dominicano" },
  { label: "Banco BHD León", value: "Banco BHD León" },
  {
    label: "Scotiabank República Dominicana",
    value: "Scotiabank República Dominicana",
  },
  { label: "Banco del Progreso", value: "Banco del Progreso" },
  { label: "Banco Santa Cruz", value: "Banco Santa Cruz" },
  { label: "Banco Caribe", value: "Banco Caribe" },
  { label: "Banco Lafise Bancshares", value: "Banco Lafise Bancshares" },
  { label: "Banco Vimenca", value: "Banco Vimenca" },
  {
    label: "Banco Nacional de Crédito (Bancredito)",
    value: "Banco Nacional de Crédito (Bancredito)",
  },
  { label: "Banco Sofitasa", value: "Banco Sofitasa" },
  { label: "Banco F&C", value: "Banco F&C" },
  {
    label: "Banco Agrícola de la República Dominicana (BAR)",
    value: "Banco Agrícola de la República Dominicana (BAR)",
  },
];

const timezoneItems = (countryCode: string) => {
  switch (countryCode) {
    case "DO":
      return "America/Santo_Domingo";
    case "US":
      return "America/New_York";
    case "CO":
      return "America/Bogota";
    case "CA":
      return "America/Toronto";
    default:
      return "";
  }
};

export interface SchedulesInterface {
  day: string;
  enabled: boolean;
  opening_time: Date;
  closing_time: Date;
}

const createTime = (hour: number, minute = 0) => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};

const schedules: SchedulesInterface[] = [
  { day: "Monday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Tuesday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Wednesday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Thursday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Friday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Saturday", enabled: true, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
  { day: "Sunday", enabled: false, opening_time: createTime(10, 0), closing_time: createTime(20, 0) },
];

export { ListBank, timezoneItems, schedules };
