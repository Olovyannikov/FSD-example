import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from '@argon-router/react';

import { useIsLarge } from '@/shared/lib/media';

import { Footer } from './ui/Footer';
import { Header } from './ui/Header';
import { Navigation } from './ui/Navigation';

import s from './RootLayout.module.css';

interface RootLayoutProps {
    title?: string;
}

export const RootLayout = ({ title = 'DogFood | Главная', children }: PropsWithChildren<RootLayoutProps>) => {
    const isLarge = useIsLarge();
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Header className={s.header} />
            <div className={s.wrapper}>
                <main>
                    <Outlet />
                    {children}
                </main>
                {isLarge ? null : <Navigation />}
            </div>
            <Footer />
        </>
    );
};
