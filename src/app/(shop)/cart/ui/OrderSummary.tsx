'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";


export const OrderSummary = () => {

    const { totalProducts, subtotal, impuestos, total } = useCartStore( state => state.getSummaryInformation());

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoaded(true);
    }, [])
    

    if( !loaded ) return <p>Cargando...</p>

    return (
        <>
            <span>No. de Productos</span>
            <span className='text-right'>{ totalProducts === 1 ? '1 artículo' : `${totalProducts} artículos` }</span>

            <span>Subtotal</span>
            <span className='text-right'>{ currencyFormat(subtotal)}</span>

            <span>Impuestos (15%)</span>
            <span className='text-right'>{currencyFormat(impuestos)}</span>

            <span className='text-2xl mt-5'>Total:</span>
            <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
        </>

    )
}
