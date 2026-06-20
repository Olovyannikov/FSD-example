import { useRouter } from '@argon-router/react';
import { Anchor, Group, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export function BackControl() {
    const router = useRouter();

    return (
        <Anchor onClick={router.onBack}>
            <Group>
                <IconArrowLeft />
                <Text>Назад</Text>
            </Group>
        </Anchor>
    );
}
