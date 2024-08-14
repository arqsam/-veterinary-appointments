export const dateFormat = (date: Date): string => {
  const nuevaFecha = new Date(date);
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
