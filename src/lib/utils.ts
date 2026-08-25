export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return "Consultar";
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
