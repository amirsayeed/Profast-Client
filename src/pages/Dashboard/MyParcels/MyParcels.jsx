import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ParcelsTable from './ParcelsTable';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: parcels={}} = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    });

    console.log(parcels);

     // View Parcel
  const handleView = (parcel) => {
    console.log('🔍 View Parcel:', parcel);
  };

  // Pay for Parcel
  const handlePay = (parcel) => {
    console.log(parcel)
  };

  // Delete Parcel
  const handleDelete = (parcel) => {
    console.log(parcel);
  };

    return (
        <div>
            <h2>My parcel coming here: {parcels.length}</h2>
            <ParcelsTable
                parcels={parcels}
                onView={handleView}
                onPay={handlePay}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default MyParcels;