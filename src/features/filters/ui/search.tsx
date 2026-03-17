import { CloseButton, Input } from '@mantine/core';
import { useUnitShape } from 'effector-use-unit-shape';

import { FiltersModel } from '../model/filters';

export const Search = () => {
    const { search, onSearchTermChange } = useUnitShape(FiltersModel.viewModel);

    return (
        <Input
            pos='relative'
            radius='500px'
            size='lg'
            w='100%'
            maw={468}
            styles={{
                input: {
                    fontSize: 'var(--size-md)',
                },
            }}
            name='search'
            placeholder='Найти товар'
            value={search}
            onChange={(event) => onSearchTermChange(event.currentTarget.value)}
            rightSectionPointerEvents='all'
            rightSection={
                search && (
                    <CloseButton
                        bg='gray.4'
                        c='white'
                        pos='absolute'
                        right={20}
                        size='xs'
                        radius='100%'
                        aria-label='Очистить поле ввода'
                        onClick={() => onSearchTermChange('')}
                    />
                )
            }
        />
    );
};
