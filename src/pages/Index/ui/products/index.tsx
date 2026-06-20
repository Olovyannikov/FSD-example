import { Center, Grid, Loader, Text } from '@mantine/core';
import { useUnitShape } from 'effector-use-unit-shape';
import { useIntersectionObserver } from 'usehooks-ts';

import { getDeclinations } from '@/shared/lib/declinations';
import { useIsLarge } from '@/shared/lib/media';

import { ProductCard, ProductModel, PRODUCTS_SCROLL_THRESHOLD } from '@/entities/Product';
import { UserModel } from '@/entities/User';

import { AddToCart } from '@/features/cart/add-to-cart';
import { AddToFavorite } from '@/features/favorite/add-to-favorite';
import { FiltersModel } from '@/features/filters';

import { ProductsModel } from '../../model';

export function Products() {
    const isLarge = useIsLarge();

    const { query, page, incrementPage } = useUnitShape(FiltersModel);
    const { products, isLoading, productsCount } = useUnitShape(ProductModel);
    const { isEmpty } = useUnitShape(ProductsModel);
    const { isAuthorized } = useUnitShape(UserModel);

    const { ref } = useIntersectionObserver({
        initialIsIntersecting: false,
        threshold: isLarge ? PRODUCTS_SCROLL_THRESHOLD.LARGE : PRODUCTS_SCROLL_THRESHOLD.SMALL,
        onChange: (isIntersecting) => {
            if (!isIntersecting || Number(page) >= productsCount) return;
            if (products.length > 0) incrementPage();
        },
    });

    return (
        <>
            {!isEmpty && query.length > 0 && (
                <Text pt='lg' fz={isLarge ? 28 : 24}>
                    По запросу&nbsp;
                    <Text span fw='800' fz={isLarge ? 28 : 24}>
                        {query}
                    </Text>
                    &nbsp;
                    {getDeclinations({
                        count: products?.length ?? 0,
                        few: 'найдено',
                        many: 'найдено',
                        one: 'найден',
                        withoutCount: true,
                    })}
                    &nbsp;
                    {getDeclinations({
                        count: products?.length ?? 0,
                        few: 'товара',
                        many: 'товаров',
                        one: 'товар',
                    })}
                </Text>
            )}
            {isEmpty && 'По запросу ' + query + ' ничего не найдено'}
            {/*<SortBar />*/}
            <>
                <Grid py={isLarge ? '4xl' : 'lg'} gutter={isLarge ? 'md' : 'xs'}>
                    {products?.map((product) => (
                        <Grid.Col
                            span={{
                                xs: 12,
                                sm: 6,
                                md: 3,
                            }}
                            key={product.id}
                        >
                            <ProductCard
                                {...product}
                                isAuth={isAuthorized}
                                actionSlot={<AddToCart product={product} />}
                                favoriteActionSlot={<AddToFavorite productId={product.id} />}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
                {!isLoading && <div ref={ref} />}
                {/*<ProductsPagination />*/}
            </>
            {isLoading && (
                <Center py='md'>
                    <Loader />
                </Center>
            )}
        </>
    );
}
