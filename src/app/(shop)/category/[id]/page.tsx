import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: Category;
    }
}

const products = initialData.products;

export default async function CategoryPage({ params }: Props) {

    const { id } = await params;

    const obtenerCategoria = () => {
        switch (id) {
            case 'men':
                return 'Hombres'
                
            case 'women':
                return 'Mujeres'

            case 'kid':
                return 'Niños'
        
            default:
                notFound();
        }
    }

    return (
        <>
            <Title
                title={`Productos de ${obtenerCategoria()}`}
                subtitle={`Todos los productos para ${obtenerCategoria()}`}
                className="mb-2"
            />

            <ProductGrid
                products={ products.filter( product => product.gender === id ) }
            />
        </>
    );
}