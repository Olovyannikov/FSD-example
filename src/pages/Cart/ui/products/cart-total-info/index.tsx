import { Button, Divider, Flex, NumberFormatter, Paper, Stack, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { useIsLarge } from '@/shared/lib/media';

import { CartModel } from '@/entities/Cart';

export function CartTotalInfo() {
    const isLarge = useIsLarge();
    const { cartCount, totalFullPrice, totalFullDiscount, price, onResetCart } = useUnit({
        cartCount: CartModel.$cartProductsCount,
        totalFullPrice: CartModel.$cartTotalFullPrice,
        totalFullDiscount: CartModel.$cartTotalFullDiscount,
        price: CartModel.$cartTotalFinalPrice,
        onResetCart: CartModel.resetCart,
    });

    if (cartCount === 0) return null;

    return (
        <Paper shadow='lg' p='md' radius='lg' w='100%' maw={isLarge ? 312 : '100%'} h='fit-content'>
            <Title order={3} mb='xl'>
                Ваша корзина
            </Title>
            <Stack ff='Verdana, system-ui' gap='md' mb='xl'>
                <Flex justify='space-between'>
                    <Text c='dimmed'>Товары ({cartCount})</Text>
                    <Text>
                        <NumberFormatter thousandSeparator=' ' value={totalFullPrice} suffix=' ₽' />
                    </Text>
                </Flex>
                <Flex justify='space-between' hidden={totalFullDiscount === 0}>
                    <Text c='dimmed'>Скидка</Text>
                    <Text c='red.5'>
                        <NumberFormatter thousandSeparator=' ' prefix='- ' value={totalFullDiscount} suffix=' ₽' />
                    </Text>
                </Flex>
                <Divider />
                <Flex justify='space-between'>
                    <Text fw='700'>Общая стоимость</Text>
                    <Text fw='700'>
                        <NumberFormatter thousandSeparator=' ' value={price} suffix=' ₽' />
                    </Text>
                </Flex>
            </Stack>
            <Button onClick={onResetCart} size='lg' radius='xl' bg='yellow.3' c='black' w='100%' fw='700'>
                Оформить заказ
            </Button>
        </Paper>
    );
}
