"use client"

import React from "react";
import SearchProducts from "../components/SearchProducts";
import MainPage from "../components/MainPage";
import LocationButton from "../components/LocationButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center mx-auto max-w-4xl mt-8">
        <Image src="/Grocery shopping-rafiki.svg" alt="" width={600} height={600}/>
        <div className="relative -top-56">
          <SearchProducts />
        </div>
        <div className="flex justify-center relative -top-52">
          <LocationButton />
        </div>
      </div>
      <div>
        <MainPage />
      </div>
    </div>
  );
};