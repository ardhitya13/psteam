import { prisma } from "../db";

export async function generateProductCode(category: string) {
  const prefix = category.toUpperCase();

  const last = await prisma.product.findFirst({
    where: { category },
    orderBy: { id: "desc" },
  });

  let number = 1;

  if (last && last.code) {
    const match = last.code.match(/(\d+)$/);
    if (match) number = parseInt(match[1]) + 1;
  }

  return `PSTEAM-${prefix}${String(number).padStart(2, "0")}`;
}
