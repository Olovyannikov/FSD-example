import { isObject } from 'lodash-es';

export function isErrorWithMessage(val: unknown): val is { data: { message: string; statusCode: number } } {
    return (
        isObject(val) &&
        'data' in (val as { data: { message: string } }) &&
        'message' in (val as { data: { message: string } }).data &&
        'statusCode' in (val as { data: { message: string; statusCode: string } }).data
    );
}
