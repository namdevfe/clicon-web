export const formatCurrency = (value: number, locale: Intl.LocalesArgument = 'en-US') => {
  if (!value) return false
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value)
}
