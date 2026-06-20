import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { LogoutModel } from '../../model';

export function LogoutButton() {
    const { onLogoutAction } = useUnit(LogoutModel.viewModel);

    return (
        <ActionIcon onClick={onLogoutAction}>
            <IconLogout />
        </ActionIcon>
    );
}
