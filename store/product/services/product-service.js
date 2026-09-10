import {products} from '../data/products';

export function getProducts() {
    return products;
}

export function getProductById(productId) {
    return products.find(
        (product) => product.id === productId
    );
}

export function getProductBySlug(slug) {
    return products.find(
        (product) => product.slug === slug
    );
}

export function getRelatedProducts(productId, category, limit = 4) {
    return products
        .filter(
            (product) =>
                product.id !== productId &&
                product.category === category
        )
        .slice(0, limit);
}