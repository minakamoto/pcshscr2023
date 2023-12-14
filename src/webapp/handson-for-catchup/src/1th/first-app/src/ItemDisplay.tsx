// ItemDisplay.tsx

export interface Item {
  name: string;
  imageUrl: string;
}

interface ItemDisplayProps {
  item: Item | null;
}

function ItemDisplay({ item }: ItemDisplayProps) {
  return (
    <div>
      {item && (
        <div className="mt-4">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-2"
            src={item.imageUrl}
            alt={item.name}
          />
          <p className="text-sm text-gray-500 text-center mt-2">{item.name}</p>
        </div>
      )}
    </div>
  );
}

export default ItemDisplay;
