import { Container, Flex, Text, Title } from '@mantine/core';
import { useUnitShape } from 'effector-use-unit-shape';

import { appStarted } from '@/shared/config';
import { getDeclinations } from '@/shared/lib/declinations';
import { useIsLarge } from '@/shared/lib/media';

import { CartEmpty, CartModel } from '@/entities/Cart';

import { CartProducts, CartTotalInfo } from './products';

appStarted();
export default function CartPage() {
    const isLarge = useIsLarge();

    const { cart, cartProductsCount } = useUnitShape(CartModel);

    const titleFontSize = isLarge ? 'var(--size-2xl)' : 'var(--size-xl)';

    return (
        <Container py='lg' h='100%' display='flex' style={{ flexDirection: 'column' }}>
            <Title fz={titleFontSize} mb='lg'>
                {getDeclinations({
                    count: cartProductsCount,
                    few: 'товара',
                    many: 'товаров',
                    one: 'товар',
                })}
                &nbsp;
                <Text fz={titleFontSize} span fw={400}>
                    в корзине
                </Text>
            </Title>
            <CartEmpty cart={cart} />
            <Flex gap={isLarge ? 60 : 'lg'} direction={isLarge ? 'row' : 'column'}>
                <CartProducts />
                <CartTotalInfo />
            </Flex>
        </Container>
    );
}
