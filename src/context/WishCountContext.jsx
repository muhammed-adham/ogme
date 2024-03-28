import { createContext, useState } from "react";


export const WishCountContext = createContext();

const WishCountProvider = ({ children }) => {
  const [wishCount, setWishCount] = useState(0);

  return (
    <WishCountContext.Provider value={{ wishCount, setWishCount }}>
      {children}
    </WishCountContext.Provider>
  );
};

export default WishCountProvider