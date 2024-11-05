import * as React from "react";
import HeroBanner from "@/components/HeroBanner";
import { IProduct } from "@/interfaces/product";


export default async function About() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const products: IProduct[] = await res.json();


  if (products && products.length > 0) {
    return <HeroBanner {...products[0]} />;
  }

  return null;
}
