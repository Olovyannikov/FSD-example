import type { ComponentProps } from 'react';
import { Container, Flex, Paper } from '@mantine/core';

import { Navigation } from '@/pages/IndexPage/ui/Navigation';

import Logo from '../../images/logo.svg?react';
import LogoSmall from '../../images/logo-sm.svg?react';
import { useIsLarge } from '../../lib/media';
import { Search } from '../Search';

import s from './Header.module.css';

export function Header({ className }: ComponentProps<'header'>) {
    const isLarge = useIsLarge();

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
                    <a href='/'>{isLarge ? <Logo /> : <LogoSmall />}</a>
                    <Search />
                    <Navigation />
                </Flex>
            </Container>
        </Paper>
    );
}
