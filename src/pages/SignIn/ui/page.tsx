import { Flex } from '@mantine/core';

import { appStarted } from '@/shared/config';

import { AuthForm } from './form.tsx';

appStarted();
export default function SignInPage() {
    return (
        <Flex h='80vh' align='center' justify='center'>
            <AuthForm />
        </Flex>
    );
}
