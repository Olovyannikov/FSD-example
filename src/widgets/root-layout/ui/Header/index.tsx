import type { ComponentProps } from 'react';
import { Link, useIsOpened } from '@argon-router/react';
import { Container, Flex, Paper } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/media';
import { routes } from '@/shared/router';

import { Search } from '@/features/filters';

import Logo from '../../images/logo.svg?react';
import LogoSmall from '../../images/logo-sm.svg?react';
import { Navigation } from '../Navigation';

import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const isLarge = useIsLarge();
    const isHomeActive = useIsOpened(routes.home);

    const logo = isLarge ? <Logo /> : <LogoSmall />;

    return (
        <Paper
            px='sm'
            py='md'
            radius={0}
            bg='yellow.3'
            component='header'
            className={className}
            data-testid='RootLayout__Header'
        >
            <Container>
                <Flex className={s.box} align='center' gap={isLarge ? 56 : '3xl'}>
                    {isHomeActive ? logo : <Link to={routes.home}>{logo}</Link>}
                    <Search />
                    <Navigation />
                </Flex>
            </Container>
        </Paper>
    );
};
