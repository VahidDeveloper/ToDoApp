"use client";
import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export default function Providers({children}: { children: ReactNode }) {


    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
            mutations: {
                retry: false,
                onError: (error: unknown) => {
                    if (error && typeof error === 'object' && 'response' in error) {
                        const err = error as { response?: { data?: { result?: string } } };
                        console.log(err?.response?.data?.result);
                    }
                }
            },
        },
    });


    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}