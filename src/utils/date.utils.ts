export const getCurrentDate = (): Date => {
  return new Date();
};

export const getWeekday = (locale: string = 'pt-BR'): string => {
  return getCurrentDate().toLocaleDateString(locale, { 
    weekday: 'long' 
  }).replace(/^\w/, (c) => c.toUpperCase());
};

export const getDate = (locale: string = 'pt-BR'): string => {
  return getCurrentDate().toLocaleDateString(locale);
};

export const getFullFormattedDate = (locale: string = 'pt-BR'): string => {
  const weekday = getWeekday(locale);
  const date = getDate(locale);
  return `${weekday}, ${date}`;
};