import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaSearch, FaBan } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const ActiveRiders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const axiosSecure = useAxiosSecure();
  // Fetch active riders using useQuery
  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    },
  });

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will deactivate the rider and move them to pending.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f59e0b',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}`, { status: 'pending' });
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Deactivated!',
            text: 'Rider has been moved to pending.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        } else {
          throw new Error('No document modified');
        }
      } catch (error) {
        console.error('Failed to deactivate rider', error);
        Swal.fire({
          title: 'Error!',
          text: 'Could not deactivate the rider.',
          icon: 'error',
        });
      }
    }
  };

  const filteredRiders = riders.filter(rider =>
    rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Active Riders</h2>

      <div className="flex items-center gap-2 mb-4">
        <FaSearch />
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Loading/>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>District</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, idx) => (
                <tr key={rider._id}>
                  <td>{idx + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phoneNumber}</td>
                  <td>{rider.district}</td>
                  <td>{new Date(rider.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleDeactivate(rider._id)}
                    >
                      <FaBan className="mr-1" /> Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">No matching riders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
