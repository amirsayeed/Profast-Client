import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const BeARider = () => {
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const [selectedRegion, setSelectedRegion] = useState("");
  const regions = [...new Set(serviceCenters.map((s)=> s.region))];
  const districts = serviceCenters.filter((s)=> s.region === selectedRegion)
  .map((s)=> s.district);
 
  const onSubmit = async (data) => {
  const riderData = {
    ...data,
    name: user?.displayName,
    email: user?.email,
    status: 'pending',
    appliedAt: new Date().toISOString()
  };

  console.log(riderData);

    try {
        const res = await axiosSecure.post('/riders', riderData);
        if (res.data?.insertedId) {
        Swal.fire({
            icon: 'success',
            title: 'Application Submitted',
            text: 'Your application has been submitted successfully!',
            confirmButtonColor: '#3085d6'
        });
          reset();
        }
    } catch (error) {
        Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: '#d33'
        });
        console.error(error);
    }
};

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Apply to Be a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ''}
            readOnly
            {...register('name')}
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ''}
            readOnly
            {...register('email')}
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Age */}
        <div>
          <label className="font-medium">Age</label>
          <input
            type="number"
            {...register('age', { required: true, min: 18 })}
            className="input input-bordered w-full mt-1"
            placeholder="Enter your age"
          />
          {errors.age && (
            <span className="text-red-500 text-sm">You must be 18 or older</span>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="font-medium">Region</label>
          <select {...register('region', { required: true })} 
          onChange={(e)=>setSelectedRegion(e.target.value)}
          className="select select-bordered w-full mt-1">
            <option value="">Select Region</option>
            {regions.map((region,idx) => (
              <option key={idx} value={region}>{region}</option>
            ))}
          </select>
          {errors.region && <span className="text-red-500 text-sm">Region is required</span>}
        </div>

        {/* District */}
        <div>
          <label className="font-medium">District</label>
          <select {...register('district', { required: true })} 
          disabled={!selectedRegion}
          className="select select-bordered w-full mt-1">
            <option value="">Select District</option>
            {districts.map((district,idx) => (
              <option key={idx} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <span className="text-red-500 text-sm">District is required</span>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="font-medium">Phone Number</label>
          <input
            type="tel"
            {...register('phoneNumber', { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="e.g., +8801XXXXXXXXX"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">Phone number is required</span>
          )}
        </div>

        {/* NID */}
        <div>
          <label className="font-medium">National ID Card Number</label>
          <input
            type="text"
            {...register('nid', { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="Enter your NID number"
          />
          {errors.nid && (
            <span className="text-red-500 text-sm">NID is required</span>
          )}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="font-medium">Bike Brand</label>
          <input
            type="text"
            {...register('bikeBrand', { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="e.g., Yamaha, Honda"
          />
          {errors.bike_brand && (
            <span className="text-red-500 text-sm">Bike brand is required</span>
          )}
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="font-medium">Bike Registration Number</label>
          <input
            type="text"
            {...register('bikeRegNumber', { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="e.g., DHA-XX-1234"
          />
          {errors.bike_registration && (
            <span className="text-red-500 text-sm">Registration number is required</span>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary text-black w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
