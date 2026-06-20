import type { Product } from '@/shared/api';

export interface Cart {
    product: Product;
    count: number;
}
