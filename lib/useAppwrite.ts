// imports hooks
import { useCallback, useEffect, useState } from "react";
// imports libraries
import { Alert } from "react-native";

// defines interface for options
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => Promise<T>;
    params?: P;
    skip?: boolean;
}

// defines interface for return
interface UseAppwriteReturn<T, P> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (newParams?: P) => Promise<void>;
}

// creates and exports custom useAppwrite hook
const useAppwrite = <T, P extends Record<string, string | number>>({
                                                                       fn,
                                                                       params = {} as P,
                                                                       skip = false,
                                                                   }: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {

    // hooks section
    // uses useState hook to manage data, loading, and error states
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    // uses useCallback hook to memoize the fetchData function to prevent unnecessary re-renders
    const fetchData = useCallback(
        async (fetchParams: P) => {
            setLoading(true);
            setError(null);
            // try catch block for handling errors while fetching data
            try {
                const result = await fn({ ...fetchParams });
                setData(result);
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    // uses useEffect hook to fetch data when the component mounts
    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, []);

    // defines async function to refetch data with new search parameters
    const refetch = async (newParams?: P) => await fetchData(newParams!);

    return { data, loading, error, refetch };
};

export default useAppwrite;