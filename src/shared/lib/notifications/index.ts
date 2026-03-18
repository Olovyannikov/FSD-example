import type { NotificationProps } from '@mantine/core';
import { type NotificationData, notifications } from '@mantine/notifications';
import { createEffect } from 'effector';

export const notifyFx = createEffect((args: NotificationData & NotificationProps) => {
    notifications.show(args);
});
