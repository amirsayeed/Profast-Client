import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ParcelsTable from './ParcelsTable';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: parcels=[],refetch} = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    });

    console.log(parcels);

     // View Parcel
  const handleView = (parcel) => {
    console.log('🔍 View Parcel:', parcel );
  };

  // Pay for Parcel
  const handlePay = (parcel) => {
    console.log(parcel)
  };

  // Delete Parcel
  const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })
                
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
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