import {DependencyList, useEffect, useCallback} from 'react'

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList,
) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedFn = useCallback(fn, deps || []);
    
    useEffect(() => {
        const t = setTimeout(() => {
            memoizedFn()
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
    }, [memoizedFn, waitTime])
}
