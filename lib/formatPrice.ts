export function formatPrice(price: string | null) {

  if (price === 'Gratis' || price === "0") {
    return "Gratis";
  }
  const priceNumber = price ? parseFloat(price.replace(",", ".")) : 0;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(priceNumber);
}
