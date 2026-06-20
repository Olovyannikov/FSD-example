import { Link } from '@argon-router/react';
import { Button, Flex, Stack, Text } from '@mantine/core';
import { IconMoodSad2 } from '@tabler/icons-react';

import { routes } from '@/shared/router';

import type { Cart } from '../../model/types';

interface CartEmptyProps {
    cart: Cart[];
}

export const CartEmpty = ({ cart }: CartEmptyProps) => {
    if (cart.length > 0) return null;

    return (
        <Stack align='center' gap='lg' m='auto'>
            <IconMoodSad2 size={80} color='var(--mantine-color-gray-3)' />
            <Flex direction='column' align='center'>
                <Text fw='bold'>В корзине нет товаров</Text>
                <Text fz={14} c='dimmed' style={{ textAlign: 'center' }}>
                    Добавьте товар, нажав кнопку «В&nbsp;корзину» в&nbsp;карточке товара
                </Text>
            </Flex>
            {/* @ts-expect-error polymorph */}
            <Button variant='outline' radius='xl' size='lg' component={Link} to={routes.home}>
                На главную
            </Button>
        </Stack>
    );
};
