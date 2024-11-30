"use client";
import Header from "./components/header/page";
import Card from "./components/card/page";
import Categories from "./components/categories/page";
import Banner from "./components/banner/page";
import Activities from "./components/activities/page";
import { getAuthToken } from "./utils/api";

export default function Home() {
  const token = getAuthToken();

  return (
    <div className="min-h-full">
      <Header token={token} />
      <Banner />
      <main>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Categories />
          <Card />
        </div>
        <Activities />
      </main>
    </div>
  );
}
