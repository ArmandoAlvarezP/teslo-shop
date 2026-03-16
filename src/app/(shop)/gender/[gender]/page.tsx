export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma/enums";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: {
        gender: string;
    }
    searchParams: Promise<{
        page: string,
    }>
}


export default async function CategoryPage({ searchParams, params }: Props) {

    

    const page =  (await searchParams).page ? parseInt( (await (searchParams)).page ) : 1;

    const {gender} = ( await params );
    
    const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page, gender: gender as Gender});

    if( products.length === 0 ) {
        redirect( `/gender/${gender}` );
    }

    const obtenerCategoria = () => {
        switch (gender) {
            case 'men':
                return 'Hombres'

            case 'women':
                return 'Mujeres'

            case 'kid':
                return 'Niños'
            
            case 'unisex': 
                return 'Todos'

            default:
                notFound();
        }
    }

    return (
        <>
            <Title
                title={`Productos para ${obtenerCategoria()}`}
                subtitle={`Todos los productos para ${obtenerCategoria()}`}
                className="mb-2"
            />

            <ProductGrid
                products={products.filter(product => product.gender === gender)}
            />

            <Pagination totalPages={totalPages}/>
        </>
    );
}