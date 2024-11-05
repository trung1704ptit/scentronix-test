import * as React from "react";
import HeroBanner from "@/components/HeroBanner";
import { IProduct } from "@/interfaces/product";


export default async function Shop() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const products: IProduct[] = await res.json();

  if (products && products.length > 9) {
    const data = products[8];
    return <HeroBanner title={data.title} body={data.body} />;
  }

  return null;
}
