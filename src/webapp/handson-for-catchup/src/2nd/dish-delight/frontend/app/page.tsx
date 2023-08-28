// dish-delight/frontend/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getStores } from "@/lib/api";

export default async function Home() {
  const stores = await getStores();
  return (
    <div>
      <Navbar />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">
          Welcome to Jojo University Cafeteria!
        </h1>
        <Image
          className="hidden md:block mx-auto mt-4"
          src={"https://images.unsplash.com/photo-1567521464027-f127ff144326"}
          alt="University Cafeteria Image"
          width={500}
          height={375}
        />
      </div>
      <div className="text-center mt-6 mx-2">
        <h2 className="text-xl text-gray-500">
          Select the store where you would like to see the menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                <Image
                  className="w-full"
                  src={store.img}
                  alt={store.name}
                  width={300}
                  height={300}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{store.name}</div>
                  <p className="text-gray-700 text-base">{store.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
