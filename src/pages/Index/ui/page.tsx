import { Container } from '@mantine/core';

import { Products } from './products';

export default function IndexPage() {
    return (
        <Container component='section'>
            <Products />
        </Container>
    );
}
