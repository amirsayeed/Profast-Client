import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from "react-icons/fa";
import MakeAdminTable from './MakeAdminTable';
const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState('');

    const {data:users=[],isFetching,refetch} = useQuery({
        queryKey: ['searchedUsers',emailQuery],
        enabled: !!emailQuery,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        }
    });


    return (
         <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Make Admin</h2>

            <div className="mb-6">
                <label className="flex gap-2 items-center input input-bordered w-full max-w-xs">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search user by email"
                        value={emailQuery}
                        onChange={(e) => setEmailQuery(e.target.value)}
                    />
                </label>
            </div>
            {isFetching && <p>Loading users...</p>}

            {isFetching && users.length === 0 && emailQuery && (
                <p className='text-gray-500'>No users found.</p>
            )}

            {users.length > 0 && <MakeAdminTable users={users} axiosSecure={axiosSecure} refetch={refetch}/>}
            
        </div>
    );
};


export default MakeAdmin;