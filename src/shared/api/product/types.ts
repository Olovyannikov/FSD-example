import type { User } from '../user/dto';

interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Like {
    id: string;
    userId: string;
    productId: string;
    product: Product;
}

export interface Product {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    wight: string;
    isPublished: boolean;
    likes: Like[];
    category: Category;
    user: User;
}

export type ProductBySlugResponseDTO = Product;

export interface ProductWithLikeResponseDTO {
    message: string;
    like: Like;
}

export interface RemoveProductWithLikeResponseDTO {
    message: string;
    product: Like;
}

export interface ProductsRequestDTO {
    sort: 'high-price' | 'low-price' | 'newest' | 'oldest' | null;
    searchTerm: string | null;
    ratings: string | null;
    minPrice: string | null;
    maxPrice: string | null;
    categoryId: string | null;
    perPage: string | null;
    page: string | null;
}

export interface ProductsResponseDTO {
    products: Product[];
    length: number;
}

export interface ProductCreateRequestDTO {
    name: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    wight: string;
    tags: string[];
    isPublished: boolean;
    categoryId: number;
}
