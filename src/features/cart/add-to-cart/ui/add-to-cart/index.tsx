import { useMemo } from 'react';
import { useRouter } from '@argon-router/react';
import { Button, Flex, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import type { Product } from '@/shared/api';

import { CartModel } from '@/entities/Cart';
import { ProductModel } from '@/entities/Product';
import { UserModel } from '@/entities/User';

import { AddToCartModel } from '../../model';

interface CartButtonProps {
    product: Product | null;
    className?: string;
}

const buttonStyle = {
    p: 'xs',
    fz: 'lg',
    fw: 'bold',
    c: 'black',
    variant: 'transparent',
};

export const AddToCart = ({ product, className }: CartButtonProps) => {
    const router = useRouter();
    const { cart, addProductToCart, removeProductFromCart, isAuth } = useUnit({
        cart: CartModel.$cart,
        addProductToCart: AddToCartModel.cartProductAdded,
        removeProductFromCart: AddToCartModel.cartProductRemoved,
        products: ProductModel.$products,
        isAuth: UserModel.$isAuthorized,
    });

    const existedProductInCart = useMemo(() => cart.find((el) => el.product.id === product?.id), [cart, product?.id]);

    const isCartButtonDisabled = useMemo(
        () => cart.find((el) => el.product.id === product?.id)?.count === product?.stock,
        [cart, product?.id, product?.stock]
    );

    const cartCount = useMemo(
        () => cart.find((current) => current.product.id === product?.id)?.count,
        [cart, product?.id]
    );

    if (existedProductInCart) {
        return (
            <Flex
                w='fit-content'
                h='max-content'
                mih={42}
                align='center'
                justify='center'
                className={className}
                styles={{ root: { border: '1px solid lightgrey', borderRadius: 'var(--size-xl)' } }}
            >
                <Button {...buttonStyle} onClick={() => product && removeProductFromCart(product)}>
                    <IconMinus />
                </Button>
                <Text fw='bold' span miw={20} ta='center'>
                    {cartCount}
                </Text>
                <Button
                    {...buttonStyle}
                    disabled={isCartButtonDisabled}
                    c={isCartButtonDisabled ? 'gray.4' : 'black'}
                    onClick={() => product && addProductToCart(product)}
                >
                    <IconPlus />
                </Button>
            </Flex>
        );
    }

    return product ? (
        <Button
            c='black'
            bg={product?.stock ? 'yellow.4' : 'gray.4'}
            radius='50px'
            size='md'
            w='fit-content'
            disabled={!product?.stock}
            onClick={() =>
                isAuth
                    ? addProductToCart(product)
                    : router.onNavigate({
                          path: '/sign-in',
                          query: {},
                      })
            }
        >
            В корзину
        </Button>
    ) : null;
};
