import { Box } from '@mantine/core';
import { useUnit } from 'effector-react/compat';

import { getUserByIdQuery } from '@/shared/api';
import { appStarted } from '@/shared/config';

import { UserCard } from '@/entities/User';

import { LogoutButton } from './logout-action';

appStarted();

export default function ProfilePage() {
    const { data } = useUnit(getUserByIdQuery);

    return (
        <Box component='section'>
            <UserCard {...data} logoutAction={<LogoutButton />} />
        </Box>
    );
}
