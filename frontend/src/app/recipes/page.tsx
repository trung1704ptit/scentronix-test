import * as React from "react";
import HeroBanner from "@/components/HeroBanner";
import { IProduct } from "@/interfaces/product";

export default async function Recipes() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const products: IProduct[] = await res.json();

  if (products && products.length > 7) {
    return (
      <HeroBanner
        {...products[6]}
        image="https://www.allrecipes.com/thmb/aF42qMerX6hELzvvO14dC5crXMs=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6788-amish-white-bread-DDMFS-4x3-6faa1e552bdb4f6eabdd7791e59b3c84.jpg"
      />
    );
  }

  return null;
}
