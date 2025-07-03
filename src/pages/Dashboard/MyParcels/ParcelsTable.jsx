import React from 'react';

const ParcelsTable = ({parcels,onView,onPay,onDelete}) => {
    return (
        <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Total Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>৳{parcel.totalCost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === 'paid'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onView(parcel)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onPay(parcel._id)}
                  disabled={parcel.payment_status === 'paid'}
                >
                  Pay
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(parcel._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {parcels.length === 0 && (
        <p className="text-center text-sm text-gray-500 py-4">No parcels found.</p>
      )}
    </div>
    );
};

export default ParcelsTable;