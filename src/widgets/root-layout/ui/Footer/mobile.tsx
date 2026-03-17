import { Anchor, Center, Stack, Text, Title } from '@mantine/core';

import { FOOTER_CONTACTS, getNormalPhone } from './const.ts';

export const Mobile = () => (
    <Center>
        <Stack gap='sm'>
            <Title ta='center' order={3} fz='md'>
                {FOOTER_CONTACTS.title}
            </Title>
            <Stack gap='xxs'>
                <Anchor fz='lg' ta='center' fw={800} c='black' href={`tel:${getNormalPhone(FOOTER_CONTACTS.phone)}`}>
                    {FOOTER_CONTACTS.phone}
                </Anchor>
                <Anchor fz='14px' ta='center' c='black' href='mailto:dogfood.ru@gmail.com'>
                    {FOOTER_CONTACTS.email}
                </Anchor>
            </Stack>
            <Text fz='xs'>{FOOTER_CONTACTS.copyright}</Text>
        </Stack>
    </Center>
);
