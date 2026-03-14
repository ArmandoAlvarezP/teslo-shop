import { initialData } from "@/seed/seed";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

export async function main() {
    // 1. Borrar registros 
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ])

    // Categorías 

    const { categories, products } = initialData;

    const categoriesData = categories.map( category => ({
        name: category
    }));
    
    await prisma.category.createMany({
        data: categoriesData
    });


    const categoriesDB = await prisma.category.findMany();
    
    const categoriesMap = categoriesDB.reduce((map, category) => {
        
        map[ category.name.toLocaleLowerCase() ] = category.id;

        return map;
    }, {} as Record<string, string>); // < string=shirt, categoryID >

    
    // Productos

    // const { images, type, ...product1} = products[0];

    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap['shirts']
    //     }
    // })

    products.forEach(async product => {
        const {type, images, ...rest} = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Imágenes 

        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }) )

        await prisma.productImage.createMany({
            data: imagesData
        })


    } );



    console.log('Seed ejecutado correctamente');
}

(() => {

    if(process.env.NODE_ENV === 'production') return; 

    main();
})();
