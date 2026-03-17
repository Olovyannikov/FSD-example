import type { ReactNode } from 'react';
import { Anchor, Box, Image, Stack, Text, Title } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/media';

interface ProductProps {
    id: string;
    slug: string;
    images: string;
    description: string;
    price: number;
    stock: number;
    name: string;
    discount: null | number;
    isAuth?: boolean;
    onFavorite?: (payload: string) => void;
    onRemoveFavorite?: (payload: string) => void;
    actionSlot?: ReactNode;
    favoriteActionSlot?: ReactNode;
}

export const ProductCard = ({
    name,
    images,
    description,
    price,
    stock,
    actionSlot,
    discount,
    slug,
    isAuth = false,
    favoriteActionSlot,
}: ProductProps) => {
    const isLarge = useIsLarge();

    const discountPrice = discount ? price - price * (discount / 100) : price;

    return (
        <Box pos='relative'>
            {isAuth && favoriteActionSlot}
            <Anchor component='a' c='black' href={`/product/${slug}`}>
                <Stack gap='sm' mb='xl'>
                    <Box
                        style={{
                            overflow: 'hidden',
                        }}
                        component='picture'
                        w={isLarge ? 236 : 168}
                        h={isLarge ? 187 : 125}
                    >
                        <Image
                            width={isLarge ? 236 : 168}
                            height={isLarge ? 187 : 125}
                            src={images}
                            alt={`${description} изображение`}
                            fallbackSrc={`https://placehold.co/${isLarge ? '236x168' : '187x125'}?text=Фото отсутствует`}
                        />
                    </Box>
                    <Box pt='sm' pos='relative'>
                        {discount ? (
                            <Text style={{ position: 'absolute' }} top={-4} td='line-through' fz='sm'>
                                {price}&nbsp;
                                <Text fz='sm' span ff='Verdana, system-ui'>
                                    ₽
                                </Text>
                            </Text>
                        ) : null}
                        <Text c={discount ? 'red' : 'black'} fw='800' mb='xs'>
                            {discountPrice}&nbsp;
                            <Text fw={800} span ff='Verdana, system-ui'>
                                ₽
                            </Text>
                        </Text>
                        <Text c='dimmed' mb='xxs'>
                            {stock} шт
                        </Text>
                        <Title mih='4xl' mah='4xl' lh='20px' fw={600} lineClamp={2} order={4} fz='md'>
                            {name}
                        </Title>
                    </Box>
                </Stack>
            </Anchor>
            {actionSlot}
        </Box>
    );
};
