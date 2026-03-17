'use client';

import { getStockBySlug } from "@/actions"
import { tittleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}


export const StockLabel = ( {slug} : Props ) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const getStock = async() => {
        const inStock = await getStockBySlug( slug );
        
        setStock( inStock );
        setIsLoading(false);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getStock();
    }, [])
    

    return (
        <>
            {
                isLoading 
                    ? 
                        <h1 
                            className={`${tittleFont.className} antialiased font-semibold animate-pulse bg-gray-200 text-sm`}
                        >
                            &nbsp;
                        </h1>
                    :
                        <h1 
                            className={`${tittleFont.className} antialiased font-semibold text-sm`}
                        >
                            Stock: { stock }
                        </h1>
            }
            
        </>
        
    )
}
