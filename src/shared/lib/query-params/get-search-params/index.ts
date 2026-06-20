export const getSearchParams = ({ keys, url }: { url: string; keys: string[] }) => {
    const params: Record<string, string | null> = {};

    keys.forEach((key) => {
        params[key] = new URL(url).searchParams.get(key);
    });

    return params;
};

export const DEFAULT_QUERY_PARAMS = {
    perPage: '12',
};
