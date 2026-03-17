import type { ReactNode } from 'react';
import { Divider, Flex, Group, Image, NumberFormatter, Paper, Stack, Text, Title } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/media';

import type { Product as IProduct } from '../../api/dto';

interface ProductProps extends Partial<IProduct> {
    actionSlot?: ReactNode;
}

export const Product = ({ images, description, price, discount, stock, name, actionSlot }: ProductProps) => {
    const isLarge = useIsLarge();
    const discountPrice = discount && price ? price - price * (discount / 100) : price;

    return (
        <Paper>
            <Flex gap='md' direction={isLarge ? 'row' : 'column'} justify='center'>
                <Image src={images} width={488} height={488} />
                <Stack>
                    <Title>{name}</Title>
                    <Group ff='Verdana, system-ui' align='center'>
                        <Text fz='lg' td={discount ? 'line-through' : ''}>
                            <NumberFormatter thousandSeparator=' ' value={price} suffix=' ₽' />
                        </Text>
                        {discount ? (
                            <Text fz='xl' c={discount ? 'red' : 'black'} fw='800'>
                                {discountPrice}&nbsp;
                                <Text fw={800} span>
                                    ₽
                                </Text>
                            </Text>
                        ) : null}
                    </Group>
                    <Text c='dimmed'>На складе: {stock} шт.</Text>
                    <Divider />
                    <Text fz='lg' c='dimmed' mb='lg'>
                        {description}
                    </Text>
                    {actionSlot}
                </Stack>
            </Flex>
        </Paper>
    );
};
