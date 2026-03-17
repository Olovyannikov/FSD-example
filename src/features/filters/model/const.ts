export interface Sort {
    label: string;
    value: 'high-price' | 'low-price' | 'newest' | 'oldest' | null;
}

export const DEBOUNCE_TIME = 600;

export const SORT_VALUES: Sort[] = [
    {
        label: 'По убыванию цены',
        value: 'high-price',
    },
    {
        label: 'По возрастанию цены',
        value: 'low-price',
    },
    {
        label: 'Сначала новые',
        value: 'newest',
    },
    {
        label: 'Сначала старые',
        value: 'oldest',
    },
];
