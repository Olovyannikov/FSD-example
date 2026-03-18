import { Flex } from '@mantine/core';

import { appStarted } from '@/shared/config';

import { RegisterForm } from './form.tsx';

appStarted();
export default function SignUpPage() {
    return (
        <Flex h='80vh' align='center' justify='center'>
            <RegisterForm />
        </Flex>
    );
}
