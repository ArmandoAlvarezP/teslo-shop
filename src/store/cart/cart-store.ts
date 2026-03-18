import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]

    getTotalItems: () => number;

    getSummaryInformation: () => { subtotal: number, impuestos:number, total:number, totalProducts:number };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity:number ) => void;
    removeProduct: ( product: CartProduct ) => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({

            cart: [],

            // Methods 

            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce( ( total, item ) => total + item.quantity, 0 );
            },


            getSummaryInformation: () => {
                const { cart } = get();

                const subtotal = cart.reduce((subtotal, item) => subtotal + item.price * item.quantity ,0 );

                const impuestos = subtotal * 0.15;

                const total = subtotal + impuestos;

                const totalProducts = cart.reduce( ( total, item ) => total + item.quantity, 0 );

                return {
                    subtotal, impuestos, total, totalProducts
                }
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1. Revisar si el producto existe en el carrito con la talla seleccionada 
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. Se que el producto existe por talla, hay que incrementar la cantidad 

                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            updateProductQuantity: ( product: CartProduct, quantity: number ) => {

                const { cart } = get();

                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });

            },

            removeProduct: ( product: CartProduct ) => {
                const { cart } = get();

                const updatedCartProducts = cart.filter( (item) =>
                    (item.id !== product.id || item.size !== product.size)
                );

                set( {cart: updatedCartProducts} );
            }

        }), {
            name: 'shopping-cart',
        }
    )
)