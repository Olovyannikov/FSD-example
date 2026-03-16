import { Helmet } from 'react-helmet';
import { Container } from '@mantine/core';
import { useGate } from 'effector-react';

import { useIsLarge } from './lib/media';
import { IndexPageGate } from './model';
import { Footer } from './ui/Footer';
import { Header } from './ui/Header';
import { Navigation } from './ui/Navigation';
import { Products } from './ui/Products';

import s from './IndexPage.module.css';

export default function IndexPage() {
    useGate(IndexPageGate);

    const isLarge = useIsLarge();

    return (
        <>
            <Helmet>
                <title>Dogfood | Главная</title>
            </Helmet>
            <div className={s.wrapper}>
                <Header className={s.header} />
                <main>
                    <Container>
                        <Products />
                    </Container>
                </main>
                <Footer />
                {isLarge ? null : <Navigation />}
            </div>
        </>
    );
}
