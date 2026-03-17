import type { ComponentProps } from 'react';
import { Container, Paper } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/media';

import { MOBILE_NAVIGATION_HEIGHT } from './const.ts';
import { Desktop } from './desktop.tsx';
import { Mobile } from './mobile.tsx';

import s from './Footer.module.css';

export const Footer = ({ className }: ComponentProps<'footer'>) => {
    const isLarge = useIsLarge();

    return (
        <Paper
            px='0'
            pt='lg'
            pb='sm'
            radius={0}
            bg='yellow.3'
            component='footer'
            className={className}
            mb={isLarge ? 0 : MOBILE_NAVIGATION_HEIGHT}
        >
            <Container className={s.container}>{isLarge ? <Desktop /> : <Mobile />}</Container>
        </Paper>
    );
};
