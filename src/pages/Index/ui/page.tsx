import { Container } from '@mantine/core';

import { appStarted } from '@/shared/config';

import { Products } from './products';

appStarted();
export default function IndexPage() {
    return (
        <Container component='section'>
            <Products />
        </Container>
    );
}
