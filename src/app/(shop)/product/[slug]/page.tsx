export const rvalidate = 604800; // 7 días 

import { tittleFont } from "@/config/fonts";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { SizeSelector, QuantitySelector, ProductSlideshow, ProductMobileSlideshow, StockLabel } from '@/components';
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    // fetch data
    const product = await getProductBySlug( slug );

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${ product?.images[1] }`],
        }
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* SlideShow */}
            <div className="col-span-1 md:col-span-2">

                {/* Mobile SlideShow */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* Desktop Slideshow */}
                <ProductSlideshow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>
            {/* Detalles */}
            <div className="col-span-1 px-5">

                <h1 className={` ${tittleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>

                {/* StockLabel */}
                <StockLabel slug={product.slug} />

                {/* Selector de Tallas */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* Selector de Cantidad */}
                <QuantitySelector
                    quantity={1}
                />

                {/* Button */}
                <button className="btn-primary my-5" >
                    Agregar al carrito
                </button>

                {/* Descripción */}
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    );
}