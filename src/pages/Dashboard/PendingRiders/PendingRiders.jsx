import { useState } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {isPending, data: riders = [], refetch} = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/riders/pending');
        return res.data;
    }
  })

  if(isPending){
    return <Loading/>;
  }

  // Approve or Cancel action
  const handleStatusUpdate = async (id, newStatus) => {
  const action = newStatus === 'active' ? 'approve' : 'cancel';

  const result = await Swal.fire({
    title: `Are you sure you want to ${action} this rider?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Yes, ${action}`,
    cancelButtonText: 'No, keep pending',
    confirmButtonColor: newStatus === 'active' ? '#22c55e' : '#ef4444',
    cancelButtonColor: '#6b7280',
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.patch(`/riders/${id}`, { status: newStatus });

      if (res.data.modifiedCount > 0) {
        setSelectedRider(null);
        refetch();

        Swal.fire({
          title: `${newStatus === 'active' ? 'Approved' : 'Cancelled'}!`,
          text: `Rider has been successfully ${action}d.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error('No document modified');
      }
    } catch (error) {
      console.error('Failed to update status', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while updating status.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  }
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, idx) => (
              <tr key={rider._id}>
                <td>{idx + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phoneNumber}</td>
                <td>{new Date(rider.appliedAt).toLocaleString()}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleStatusUpdate(rider._id, 'active')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleStatusUpdate(rider._id, 'cancelled')}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing rider details */}
      {selectedRider && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-2">{selectedRider.name}'s Info</h3>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>Phone:</strong> {selectedRider.phoneNumber}</p>
            <p><strong>Region:</strong> {selectedRider.region}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>NID:</strong> {selectedRider.nid}</p>
            <p><strong>Applied At:</strong> {new Date(selectedRider.appliedAt).toLocaleString()}</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedRider(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
