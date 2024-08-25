// components/withProtectedRoute.tsx
'use client';
import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Loader from './Loader';
const withProtectedRoute = (WrappedComponent: React.FC) => {
    const ProtectedRoute: React.FC = (props) => {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            const isauthenticated = Cookies.get('authUser');
            if (!isauthenticated) {
                router.push('/signin'); // Redirect to login if not authenticated
            }
        }, [user, router]);

        // If user is not authenticated, you can return null or a loading state
        if (!user) {

            return (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Loader />
                </div>
            )
        }

        return <WrappedComponent {...props} />;
    };

    return ProtectedRoute;
};

export default withProtectedRoute;