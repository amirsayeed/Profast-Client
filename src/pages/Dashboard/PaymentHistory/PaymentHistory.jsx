import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {isPending, data:payments} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    if(isPending){
        return <Loading/>;
    }

    return (
        <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-sm">
            <thead>
              <tr className=" text-left text-sm font-semibold ">
                <th className="p-3">#</th>
                <th className="p-3">Parcel ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={item.transactionId} className="border-t text-sm">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.parcelId}</td>
                  <td className="p-3">${item.amount.toFixed(2)}</td>
                  <td className="p-3 break-all">{item.transactionId}</td>
                  <td className="p-3">{new Date(item.paid_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
};

export default PaymentHistory;