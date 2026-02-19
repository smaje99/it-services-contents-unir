/**
 * Converts a duration in minutes to a human-readable text format in Spanish.
 * For example:
 * - 0 minutes => "0 minutos"
 * - 1 minute => "1 minuto"
 * - 60 minutes => "1 hora"
 * - 61 minutes => "1 hora y 1 minuto"
 * - 120 minutes => "2 horas"
 * - 125 minutes => "2 horas y 5 minutos"
 * @param durationInMinutes - The duration in minutes to be converted.
 * @returns A string representing the duration in a human-readable format.
 * @throws Will throw an error if the input is not a non-negative number.
 */
export function durationToTextFormatter(durationInMinutes: number): string {
  if (!Number.isFinite(durationInMinutes) || durationInMinutes < 0) {
    throw new Error('Invalid duration: must be a non-negative number (>= 0).');
  }

  const minutes = Math.floor(durationInMinutes);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursToText = (hours) => {
    if (hours === 0) {
      return '';
    }
    return hours === 1 ? '1 hora' : `${hours} horas`;
  };

  const minutesToText = (minutes) => {
    if (minutes === 0) {
      return '';
    }
    return minutes === 1 ? '1 minuto' : `${minutes} minutos`;
  };

  // Simple cases
  if (hours === 0) {
    return minutesToText(remainingMinutes) || '0 minutos';
  }
  if (remainingMinutes === 0) {
    return hoursToText(hours);
  }

  // Complex case: both hours and minutes
  return `${hoursToText(hours)} y ${minutesToText(remainingMinutes)}`;
}
