import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const [error, setError] = useState('');
    const {parcelId} = useParams();
    //console.log(parcelId);

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {isPending,data:parcelInfo} = useQuery({
        queryKey: ['parcel',parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if(isPending){
        return <Loading/>;
    }

    console.log(parcelInfo);
    const amount = parcelInfo.totalCost;
    const amountInCents = amount * 100;
    //console.log(amountInCents);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            setError(error.message);
        }else{
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        //create paymentIntent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        const clientSecret = res.data.clientSecret;

        // confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }
            }
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                console.log(result);
                const transactionId = result.paymentIntent.id;

                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types
                }

                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if(paymentRes.data.insertedId){
                     await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        // ✅ Redirect to /myParcels
                        navigate('/dashboard/myParcels');
                }
             }
            }

        console.log('res from intent', res);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4 p-4 border rounded-xl shadow bg-white'>
                <CardElement className='p-2 border rounded'/>
                    <button type='submit'
                    className="btn btn-primary w-full text-black"
                    disabled={!stripe}>
                        Pay ${amount}
                    </button>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
            </form>
        </div>
    );
};

export default PaymentForm;