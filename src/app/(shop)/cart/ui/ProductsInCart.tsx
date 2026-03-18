'use client';

import { useEffect, useState } from "react";
import Image from "next/image"
import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Link from "next/link";


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity );

    const productsInCart = useCartStore( state => state.cart );
    
    const removeProduct = useCartStore( state => state.removeProduct );

    const [loaded, setLoaded] = useState(false);
    

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoaded(true);
    }, []);
    

    if ( !loaded ) {
        return <p>Cargando...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className='mr-5 rounded'
                        />

                        <div>
                            <Link 
                                className="hover:underline cursor-pointer"  
                                href={`/product/${product.slug}`}
                            >
                                <p> {product.size} - {product.title}</p>
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector 
                                quantity={ product.quantity } 
                                onQuantityChange={ (value) => updateProductQuantity(product, value) }    
                            />

                            <button 
                                onClick={ () => removeProduct(product) }
                                className='underline mt-3 cursor-pointer'>
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
