// dish-delight/frontend/components/DataNotFound.tsx

import Navbar from "./Navbar";

type DataNotFoundProps = {
  message: string;
};

// The message will be passed on from the caller.
export default function DataNotFound({ message }: DataNotFoundProps) {
  return (
    <>
      <Navbar />
      <div className="m-3">
        <p>{message}</p>
      </div>
    </>
  );
}
