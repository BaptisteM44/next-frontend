export const formatPrice = (price: number) =>
  price.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    useGrouping: false,
  });
