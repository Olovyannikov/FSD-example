import type { ReactNode } from 'react';
import { Text } from '@mantine/core';

import { useIsLarge } from '../../lib/media';
interface NavigationItemProps {
    item:
        | {
              id: number;
              name: string;
              path: string;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath?: undefined;
          }
        | {
              id: number;
              name: string;
              path: string;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath: string;
          };
    isAuthorized?: boolean;
}

export function NavigationItem({ item }: NavigationItemProps) {
    const isLarge = useIsLarge();

    return (
        <a href={item.protectedPath}>
            {item.icon}
            {isLarge ? null : <Text fz={9}>{item.name}</Text>}
        </a>
    );
}
