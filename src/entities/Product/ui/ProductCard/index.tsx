import { type ReactNode, useMemo } from 'react';
import { Link } from '@argon-router/react';
import { Anchor, Box, Image, Stack, Text, Title } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/media';
import { routes } from '@/shared/router';

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

    const discountPrice = useMemo(() => (discount ? price - price * (discount / 100) : price), [discount, price]);
    const imageWidth = useMemo(() => (isLarge ? 236 : 168), [isLarge]);
    const imageHeight = useMemo(() => (isLarge ? 187 : 125), [isLarge]);
    const imageFallbackSrc = useMemo(
        () => `https://placehold.co/${isLarge ? '236x168' : '187x125'}?text=Фото отсутствует`,
        [isLarge]
    );

    return (
        <Box pos='relative'>
            {isAuth && favoriteActionSlot}
            {/* @ts-expect-error polymorph */}
            <Anchor component={Link} c='black' to={routes.product} params={{ slug }}>
                <Stack gap='sm' mb='xl'>
                    <Box
                        style={{
                            overflow: 'hidden',
                        }}
                        component='picture'
                        w={imageWidth}
                        h={imageHeight}
                    >
                        <Image
                            src={images}
                            width={imageWidth}
                            height={imageHeight}
                            fallbackSrc={imageFallbackSrc}
                            alt={`${description} изображение`}
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
