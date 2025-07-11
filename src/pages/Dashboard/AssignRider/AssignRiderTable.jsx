import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaMotorcycle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AssignRiderTable = ({parcels,axiosSecure}) => {
    const [riders, setRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const queryClient = useQueryClient();

    const { mutateAsync: assignRider } = useMutation({
        mutationFn: async ({ parcelId, rider }) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
                riderId: rider._id,
                riderName: rider.name,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["assignableParcels"]);
            Swal.fire("Success", "Rider assigned successfully!", "success");
            document.getElementById("assignModal").close();
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    const openAssignModal = async (parcel) => {
        setSelectedParcel(parcel);
        setLoadingRiders(true);
        setRiders([]);

        try {
            const res = await axiosSecure.get("/riders/available", {
                params: {
                    district: parcel.senderServiceCenter, // match with rider.district
                },
            });
            setRiders(res.data);
        } catch (error) {
            console.error("Error fetching riders", error);
            Swal.fire("Error", "Failed to load riders", "error");
        } finally {
            setLoadingRiders(false);
            document.getElementById("assignModal").showModal();
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Tracking ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Sender Center</th>
                        <th>Receiver Center</th>
                        <th>Cost</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel) => (
                        <tr key={parcel._id}>
                            <td>{parcel.trackingId}</td>
                            <td>{parcel.title}</td>
                            <td>{parcel.type}</td>
                            <td>{parcel.senderServiceCenter}</td>
                            <td>{parcel.receiverServiceCenter}</td>
                            <td>৳{parcel.totalCost}</td>
                            <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => openAssignModal(parcel)}
                                    className="btn btn-sm btn-primary text-black">
                                    <FaMotorcycle className="inline-block mr-1" />
                                    Assign Rider
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                {/* 🛵 Assign Rider Modal */}
                <dialog id="assignModal" className="modal">
                    <div className="modal-box max-w-2xl">
                        <h3 className="text-lg font-bold mb-3">
                            Assign Rider for Parcel:{" "}
                            <span className="text-primary">{selectedParcel?.title}</span>
                        </h3>
        
                        {loadingRiders ? (
                            <p>Loading riders...</p>
                        ) : riders.length === 0 ? (
                            <p className="text-error">No available riders in this district.</p>
                        ) : (
                            <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Bike Info</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riders.map((rider) => (
                                            <tr key={rider._id}>
                                                <td>{rider.name}</td>
                                                <td>{rider.phone}</td>
                                                <td>
                                                    {rider.bike_brand} - {rider.bike_registration}
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            assignRider({
                                                                parcelId: selectedParcel._id,
                                                                rider,
                                                            })
                                                        }
                                                        className="btn btn-xs btn-success">
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
        
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
        </div>
    );
};

export default AssignRiderTable;