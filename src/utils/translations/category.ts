const CATEGORY_TRANSLATIONS: Record<string, string> = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  moradia: 'Moradia',
  saude: 'Saúde',
  entretenimento: 'Entretenimento',
  investimentos: 'Investimentos',
  salario: 'Salário',
  renda_extra: 'Renda Extra',
  outros: 'Outros',
} as const;

export function translateCategory(category: string): string {
  return CATEGORY_TRANSLATIONS[category] || category;
}

