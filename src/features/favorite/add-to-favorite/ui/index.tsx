import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { useTimeout } from 'usehooks-ts';

import { getUserByIdQuery, removeProductLikeMutation, setProductLikeMutation } from '@/shared/api';

interface FavoriteButtonProps {
    productId: string;
}

export const AddToFavorite = ({ productId }: FavoriteButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { user, removeLike, setLike } = useUnit({
        user: getUserByIdQuery.$data,
        setLike: setProductLikeMutation.start,
        removeLike: removeProductLikeMutation.start,
    });

    const hideLoader = () => setLoading(false);
    useTimeout(hideLoader, loading ? 1000 : 0);

    const isFavoritesSettled = user?.likes.map((el) => el.product).find((el) => el.id === productId);

    return (
        <ActionIcon
            variant='subtle'
            onClick={() => {
                setLoading(true);
                isFavoritesSettled ? removeLike(productId) : setLike(productId);
            }}
            pos='absolute'
            top={0}
            right={0}
            loading={loading}
        >
            <IconHeart fill={isFavoritesSettled ? 'var(--mantine-color-yellow-4)' : 'transparent'} />
        </ActionIcon>
    );
};
