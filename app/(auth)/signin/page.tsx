"use client"
import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { login } from '../../utils/firebase';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(email, password);
            localStorage.setItem("user", JSON.stringify(response.user.uid));
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Loader />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br bg-grey flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-100 py-6 px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
                </div>
                <form onSubmit={handleSubmit} className="py-8 px-8">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    {/* Rest of the component remains the same */}
                </form>
            </div>
        </div>
    );
};

export default Login;