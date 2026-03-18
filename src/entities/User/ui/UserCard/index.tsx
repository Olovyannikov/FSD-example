import type { ReactNode } from 'react';
import { Avatar, Box, Container, Flex, Paper, Stack, Text, Title } from '@mantine/core';

import type { User } from '@/shared/api';

interface UserProps extends Partial<User> {
    logoutAction?: ReactNode;
}

export const UserCard = ({ avatarPath, name, email, about, logoutAction }: UserProps) => (
    <Paper>
        <Box h='150px' w='100%' bg='yellow.3' aria-hidden='true' />
        <Container>
            <Paper bg='white' shadow='sm' p='lg' mt={-50} radius='lg'>
                <Stack align='center'>
                    <Flex pos='relative' w='100%'>
                        <Avatar
                            mx='auto'
                            mt={-100}
                            w={150}
                            h={150}
                            src={avatarPath}
                            alt='Аватар пользователя'
                            radius='50%'
                            styles={{
                                placeholder: {
                                    '--avatar-bg': 'var(--mantine-color-gray-4)',
                                },
                            }}
                        />
                        <Box aria-label='Выход' pos='absolute' right={0} top={0}>
                            {logoutAction}
                        </Box>
                    </Flex>
                    <Title>{name ?? 'Имя пользователя'}</Title>
                    <Text c='dimmed'>{email ?? 'john@doe.com'}</Text>
                    <Text>
                        {about ??
                            'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'}
                    </Text>
                </Stack>
            </Paper>
        </Container>
    </Paper>
);
