import { Container, Group, Text, Title } from '@mantine/core';

import { RootLayout } from '@/widgets/root-layout';

import Illustration from './illustration.svg?react';
import { ReturnToHomePage } from './return-to-home-page';

import s from './ErrorPage.module.css';

export default function ErrorPage() {
    return (
        <RootLayout title='Dogfood | 404 произошла ошибка'>
            <Container className={s.root}>
                <div className={s.inner}>
                    <Illustration className={s.image} />
                    <div className={s.content}>
                        <Title className={s.title}>Здесь ничего нет</Title>
                        <Text c='dimmed' size='lg' ta='center' className={s.description}>
                            Страница, которую вы пытаетесь открыть, не существует. Возможно, вы ошиблись в адресе или
                            страница была перенесена на другой URL.
                        </Text>
                        <Group justify='center'>
                            <ReturnToHomePage size='md'>Вернуться на главную</ReturnToHomePage>
                        </Group>
                    </div>
                </div>
            </Container>
        </RootLayout>
    );
}
