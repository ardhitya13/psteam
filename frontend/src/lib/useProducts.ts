"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/apiProducts";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
