import { PropsWithChildren, createContext, useContext, useState } from "react";

const ShopContext = createContext({});

export const ShopProvider = ({ children }: PropsWithChildren) => {
    const [shopp, setShopp] = useState({});


    
    return(
        <ShopContext.Provider value={{shopp, setShopp, getAllShop}}>
            {children}
        </ShopContext.Provider>
    )


}

export const useShop = () => {
    return useContext(ShopContext);
};