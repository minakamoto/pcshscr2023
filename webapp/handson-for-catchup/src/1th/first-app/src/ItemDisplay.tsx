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
      <div>
        <img src={item.imageUrl} alt={item.name} />
        {item.imageUrl && <p>{item.name}</p>}
      </div>
    )}
  </div>
);
}

export default ItemDisplay;
