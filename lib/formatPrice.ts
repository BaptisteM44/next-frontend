export const formatPrice = (price: number) =>
  price.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    useGrouping: false,
  });

/**
 * Snipcart need a decimal price with a `.` instead of a `,`.
 *
 * @see https://docs.snipcart.com/v2/configuration/product-definition
 */
export const formatSnipcartPrice = (price: number) =>
  price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    useGrouping: false,
  });
