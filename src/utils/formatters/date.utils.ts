export const getCurrentDate = (): Date => {
  return new Date();
};

export const getWeekday = (locale: string = 'pt-BR'): string => {
  return getCurrentDate()
    .toLocaleDateString(locale, {
      weekday: 'long',
    })
    .replace(/^\w/, c => c.toUpperCase());
};

export const getDate = (locale: string = 'pt-BR'): string => {
  return getCurrentDate().toLocaleDateString(locale);
};

export const getFullFormattedDate = (locale: string = 'pt-BR'): string => {
  const weekday = getWeekday(locale);
  const date = getDate(locale);
  return `${weekday}, ${date}`;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDateOnly(dateString: string): string {
  return formatDate(dateString).split(' ')[0];
}
