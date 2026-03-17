import { Container, Stack, VisuallyHidden } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getProductBySlugQuery, Product } from '@/entities/Product';

import { BackControl } from './back';

export default function ProductPage() {
    const { data } = useUnit(getProductBySlugQuery);

    return (
        <Container py='lg'>
            <Stack component='section'>
                <VisuallyHidden aria-hidden={true}>Страница продукта {data?.name}</VisuallyHidden>
                <BackControl />
                <Product
                    {...data}
                    // actionSlot={<CartButton product={data} />}
                />
            </Stack>
        </Container>
    );
}
