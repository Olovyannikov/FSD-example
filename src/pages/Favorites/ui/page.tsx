import { Box, Container, Grid, Title } from '@mantine/core';
import { useList, useUnit } from 'effector-react';

import { useIsLarge } from '@/shared/lib/media';

import { ProductCard } from '@/entities/Product';
import { UserModel } from '@/entities/User';

import { AddToCart } from '@/features/cart/add-to-cart';
import { AddToFavorite } from '@/features/favorite/add-to-favorite';

export default function FavoritesPage() {
    const isLarge = useIsLarge();
    const isAuth = useUnit(UserModel.$isAuthorized);
    const list = useList(UserModel.$userFavorites, {
        keys: [isAuth],
        fn: ({ product }) => (
            <Grid.Col
                span={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                }}
            >
                <ProductCard
                    {...product}
                    isAuth={isAuth}
                    actionSlot={<AddToCart product={product} />}
                    favoriteActionSlot={<AddToFavorite productId={product.id} />}
                />
            </Grid.Col>
        ),
    });

    return (
        <Box component='section'>
            <Container py='lg'>
                <Title mb='4xl'>Избранные товары</Title>
                <Grid py={isLarge ? '4xl' : 'lg'} gutter={isLarge ? 'md' : 'xs'}>
                    {list}
                </Grid>
            </Container>
        </Box>
    );
}
