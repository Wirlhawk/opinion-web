// app/components/NavUser.js
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'; // Adjust the path as needed

const NavUser = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/session');
                const data = await response.json();
                setSession(data.session);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (

        <div className="flex items-center">
            <Avatar className="w-12 h-12 border border-muted font-md">
                <AvatarImage src={session?.user?.avatar || "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>

    );
};

export default NavUser;
