import { Anchor, Stack, Text, Title } from '@mantine/core';

import Logo from '../../images/logo.svg?react';
import { FOOTER_CONTACTS, getNormalPhone, NAVIGATION } from './const';

export function Desktop() {
    return (
        <>
            <Stack justify='space-between'>
                <Logo />
                <Text fz='xs'>{FOOTER_CONTACTS.desktopCopyright}</Text>
            </Stack>
            <Stack justify='space-between'>
                {NAVIGATION.slice(0, 4).map((item) => (
                    <Anchor fw='600' fz='sm' c='black' key={item.id} href={item.path} component={'a'}>
                        {item.title}
                    </Anchor>
                ))}
            </Stack>
            <Stack justify='space-between'>
                {NAVIGATION.slice(4).map((item) => (
                    <Anchor fw='600' fz='sm' c='black' key={item.id} href={item.path} component={'a'}>
                        {item.title}
                    </Anchor>
                ))}
            </Stack>
            <Stack gap='sm'>
                <Title order={3} fz='md'>
                    {FOOTER_CONTACTS.desktopTitle}
                </Title>
                <Stack gap='xxs'>
                    <Anchor fz='md' fw={800} c='black' href={`tel:${getNormalPhone(FOOTER_CONTACTS.phone)}`}>
                        {FOOTER_CONTACTS.phone}
                    </Anchor>
                    <Anchor fz='sm' c='black' href={`mailto:${FOOTER_CONTACTS.email}`}>
                        {FOOTER_CONTACTS.email}
                    </Anchor>
                </Stack>
            </Stack>
        </>
    );
}
