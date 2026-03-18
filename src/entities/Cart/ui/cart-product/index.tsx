import { type ReactNode, useMemo } from 'react';
import { ActionIcon, Flex, Image, NumberFormatter, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import type { Product } from '@/shared/api';
import { useIsLarge } from '@/shared/lib/media';

import s from './CartProduct.module.css';

interface CartProductProps extends Product {
    onRemoveProductFromCart(id: string): void;
    count: number;
    slot?: ReactNode;
    renderItem?: (p: Product) => ReactNode;
}

export const CartProduct = ({ onRemoveProductFromCart, count = 1, slot, renderItem, ...props }: CartProductProps) => {
    const { id, discount, price, images, description, name } = props;
    const isLarge = useIsLarge();

    const currentPrice = useMemo(
        () => count * (discount ? price - price * (discount / 100) : price),
        [count, discount, price]
    );

    return (
        <Flex gap='md' py='lg' align='center'>
            <Image
                style={{
                    flexShrink: 0,
                }}
                src={images}
                w={isLarge ? 62 : 68}
                h={isLarge ? 62 : 68}
                fallbackSrc={`https://placehold.co/${isLarge ? '62x62' : '68x68'}?text=Фото отсутствует`}
            />
            <Stack gap={isLarge ? 32 : 'xs'} w='100%' ff='Verdana, system-ui' className={s.productInfo}>
                <Stack gap={0} className={s.productPrice} justify='center' miw={92}>
                    {discount ? (
                        <Text fw={700} fz={isLarge ? 14 : 9} td='line-through'>
                            <NumberFormatter thousandSeparator=' ' value={count * price} suffix=' ₽' />
                        </Text>
                    ) : null}
                    <Text fw={700} c={discount ? 'red.5' : 'black'} fz={isLarge ? 20 : 14}>
                        <NumberFormatter thousandSeparator=' ' value={currentPrice} suffix=' ₽' />
                    </Text>
                </Stack>
                <Stack gap='xs' className={s.productDescription}>
                    <Text fz={isLarge ? 14 : 'sm'} fw={700}>
                        {name}
                    </Text>
                    <Text lineClamp={5} fz={isLarge ? 12 : 9} c='dimmed'>
                        {description}
                    </Text>
                </Stack>
            </Stack>
            {slot}
            {renderItem?.(props)}
            <ActionIcon
                c='gray.5'
                variant='transparent'
                className={s.removeAction}
                onClick={() => onRemoveProductFromCart(id)}
            >
                <IconTrash stroke={1} />
            </ActionIcon>
        </Flex>
    );
};
