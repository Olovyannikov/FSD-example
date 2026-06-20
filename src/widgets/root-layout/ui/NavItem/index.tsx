import type { ReactNode } from 'react';
import type { Route } from '@argon-router/core';
import { Link, useLink } from '@argon-router/react';
import { Indicator, Text } from '@mantine/core';
import { useStoreMap, useUnit } from 'effector-react';

import { getUserByIdQuery } from '@/shared/api';
import { useIsLarge } from '@/shared/lib/media';

import { CartModel } from '@/entities/Cart';
import { UserModel } from '@/entities/User';

import s from './NavItem.module.css';
interface NavigationItemProps {
    item:
        | {
              id: number;
              name: string;
              path: Route;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath?: Route;
          }
        | {
              id: number;
              name: string;
              path: Route;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath: Route;
          };
    isAuthorized?: boolean;
}

const pathWithIndicator = (path: string) => path === '/favorites' || path === '/cart';
const isFavoritesPath = (path: string) => path === '/favorites';

export const NavigationItem = ({ item }: NavigationItemProps) => {
    const isLarge = useIsLarge();

    const { cartCount, isAuthorized } = useUnit({
        isAuthorized: UserModel.$isAuthorized,
        cartCount: CartModel.$cartProductsCount,
    });

    const favoritesCount = useStoreMap(getUserByIdQuery.$data, (data) => data?.likes?.length ?? 0);

    const Wrapper = ({ children, path }: { children: ReactNode; path: Route }) => {
        const { path: currentPath } = useLink(path, undefined);

        if (pathWithIndicator(currentPath)) {
            return (
                <Indicator
                    top={0}
                    offset={4}
                    display='flex'
                    size='var(--size-sm)'
                    className={s.indicator}
                    label={isFavoritesPath(currentPath) ? favoritesCount : cartCount}
                    disabled={isFavoritesPath(currentPath) ? favoritesCount < 1 : cartCount < 1}
                >
                    {children}
                </Indicator>
            );
        }

        return <>{children}</>;
    };

    if (!isAuthorized && item.protectedPath) {
        return (
            <Link to={item.protectedPath} data-testid={item.testId}>
                {item.icon}
                {isLarge ? null : <Text fz={9}>{item.name}</Text>}
            </Link>
        );
    }

    return (
        <Link to={item.path}>
            <Wrapper path={item.path}>
                {item.icon}
                {isLarge ? null : <Text fz={9}>{item.name}</Text>}
            </Wrapper>
        </Link>
    );
};
