import { Divider, Grid } from '@mantine/core';
import { useList, useUnit } from 'effector-react';

import { useIsLarge } from '@/shared/lib/media';

import { CartModel, CartProduct } from '@/entities/Cart';

import { AddToCart, AddToCartModel } from '@/features/add-to-cart';

export function CartProducts() {
    const isLarge = useIsLarge();

    const { products, onProductRemoveFromCart } = useUnit({
        products: CartModel.$cartProducts,
        onProductRemoveFromCart: AddToCartModel.cartProductTotalRemoved,
    });

    const list = useList(CartModel.$cart, ({ count, product }) => (
        <Grid.Col span={12} key={product.id}>
            <CartProduct
                {...product}
                count={count}
                onRemoveProductFromCart={onProductRemoveFromCart}
                slot={<AddToCart product={product} />}
                // renderItem={(product) => <AddToCart product={product} />}
            />
            {!(products[products.length - 1].id === product.id) && <Divider />}
        </Grid.Col>
    ));

    return (
        <Grid py={isLarge ? '4xl' : 'lg'} gutter={isLarge ? 'md' : 'xs'}>
            {list}
        </Grid>
    );
}
