// dish-delight/frontend/app/stores/[storeId]/menus/[menuId]/page.tsx
import Image from "next/image";
import { getMenu, getStore } from "@/lib/api";
import Navbar from "@/components/Navbar";
import DataNotFound from "@/components/DataNotFound";
import { DATA_NOT_FOUND_MESSAGE } from "@/lib/constants";

export default async function Menu({
  params,
}: {
  params: { storeId: string; menuId: string };
}) {
  const storeId = Number(params.storeId);
  const menuId = Number(params.menuId);
  const store = await getStore(storeId);
  const menu = await getMenu(storeId, menuId);

  // When the store does not exist
  if (!store) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.STORE} />;
  }

  // When the menu does not exist
  if (!menu) {
    return <DataNotFound message={DATA_NOT_FOUND_MESSAGE.MENU} />;
  }

  return (
    <div>
      <Navbar storeName={store.name} storeId={store.id} />
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 md:mx-auto">
        <Image
          className="w-full"
          src={menu.img}
          alt={menu.name}
          width={300}
          height={300}
          priority={false}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{menu.name}</div>
          <p className="text-gray-500 text-base mt-2">{menu.price}</p>
          <div className="text-base mt-3">{menu.description}</div>
          {menu.options && menu.options.length > 0 && (
            <div>
              <p className="font-bold text-gray-500 text-lg mt-5">Option</p>
              {menu.options.map((option) => (
                <ul key={option.name}>
                  <li className="list-disc list-inside text-base mt-3">
                    {option.name}{" "}
                    <span className="text-gray-500">{option.price}</span>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
