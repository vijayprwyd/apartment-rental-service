export function formatCurrency(amount, locale) {
  let localeIntl;
  switch (locale) {
    case "IN":
      localeIntl = Intl.NumberFormat("en-IN");
      break;
    default:
      localeIntl = Intl.NumberFormat("en-IN");
  }
  return `₹${localeIntl.format(amount)}`;
}

export function rangeNormalizer(values, min, max) {
    const lowerLimit = values[0] > min ? values[0] : min;
    const upperLimit = values[1] < max ? values[1] : max;
    if(upperLimit < lowerLimit) return [lowerLimit, lowerLimit];
    return [lowerLimit, upperLimit];
}
