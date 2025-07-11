import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AssignRiderTable from './AssignRiderTable';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    
    const {data: parcels = [], isLoading } = useQuery({
        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&delivery_status=not_collected"
            );
            // Sort oldest first
            return res.data.sort(
                (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
            );
        },
    });


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

            {isLoading ? (
                <p>Loading parcels...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No parcels available for assignment.</p>
            ) : <AssignRiderTable parcels={parcels} axiosSecure={axiosSecure} />}
        </div>
    );
};

export default AssignRider;