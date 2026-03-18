import { Container, Stack, VisuallyHidden } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getProductBySlugQuery } from '@/shared/api';
import { appStarted } from '@/shared/config';

import { Product } from '@/entities/Product';

import { AddToCart } from '@/features/add-to-cart';

import { BackControl } from './back';

appStarted();
export default function ProductPage() {
    const { data } = useUnit(getProductBySlugQuery);

    return (
        <Container py='lg'>
            <Stack component='section'>
                <VisuallyHidden aria-hidden={true}>Страница продукта {data?.name}</VisuallyHidden>
                <BackControl />
                <Product {...data} actionSlot={<AddToCart product={data} />} />
            </Stack>
        </Container>
    );
}
