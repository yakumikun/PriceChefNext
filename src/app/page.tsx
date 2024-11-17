"use client"

import React from "react";
import SearchProducts from "../components/SearchProducts";
import MainPage from "../components/MainPage";
import LocationButton from "../components/LocationButton";

export default function Home() {
  return (
    <div>
      <div className="shadow mx-auto max-w-4xl mt-8">
        <SearchProducts />
        <div className="flex justify-center">
          <LocationButton />
        </div>
      </div>
      <div>
        <MainPage />
      </div>
    </div>
  );
};