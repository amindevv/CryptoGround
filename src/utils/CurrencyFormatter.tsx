
export default class CurrencyFormatter {

  private formatter: Intl.NumberFormat

  constructor(currency: string) {
    this.formatter = new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 6
    });
  }

  format = (value: string): string => this.formatter.format(parseFloat(value))
}
