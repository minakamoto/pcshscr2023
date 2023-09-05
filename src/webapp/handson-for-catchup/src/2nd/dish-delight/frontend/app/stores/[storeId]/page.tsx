// dish-delight/frontend/app/stores/[storeId]/page.tsx
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import { getMenus, getStore } from "@/lib/api";
import DataNotFound from "@/components/DataNotFound";
import { DATA_NOT_FOUND_MESSAGE } from "@/lib/constants";

export default async function StoreMenu({
  params,
}: {
  params: { storeId: string };
}) {
  const storeId = Number(params.storeId);
  const store = await getStore(storeId);
  const menus = await getMenus(storeId);

  // When the store does not exist
  if (!store) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.STORE} />;
  }

  // When the menu for the store does not exist
  if (menus.length === 0) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.MENU} />;
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <Link href={`/stores/${storeId}/menus/${menu.id}`} key={menu.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
              <Image
                className="w-full"
                src={menu.img}
                alt={menu.name}
                width={300}
                height={300}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{menu.name}</div>
                <p className="text-gray-700 text-base">{menu.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
