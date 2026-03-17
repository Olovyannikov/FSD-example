import { Link } from '@argon-router/react';
import { Button, type ButtonProps } from '@mantine/core';

import { routes } from '@/shared/router';

export function ReturnToHomePage({ children, ...props }: ButtonProps) {
    return (
        // @ts-expect-error expected
        <Button component={Link} to={routes.home} c='black' bg='yellow.4' {...props}>
            {children}
        </Button>
    );
}
