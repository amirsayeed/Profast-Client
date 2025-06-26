import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";


const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [submittedData, setSubmittedData] = useState(null);

  const serviceCenters = useLoaderData();

  // Extract unique regions
  const regions = [...new Set(serviceCenters.map((s) => s.region))];

  // Reusable filter function
  const getCentersByRegion = (region) =>
    serviceCenters.filter((sc) => sc.region === region);

  // Watch dynamic fields
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const filteredSenderCenters = getCentersByRegion(senderRegion);
  const filteredReceiverCenters = getCentersByRegion(receiverRegion);

  const onSubmit = (data) => {
  const { type, weight = 0, senderServiceCenter, receiverServiceCenter } = data;

  const isSameCenter = senderServiceCenter === receiverServiceCenter;
  const weightValue = parseFloat(weight);

  let totalCost = 0;

  if (type === "document") {
    totalCost = isSameCenter ? 60 : 80;
  } else {
    // Non-document
    if (weightValue <= 3) {
      totalCost = isSameCenter ? 110 : 150;
    } else {
      const extraKg = weightValue - 3;
      const extraCost = extraKg * 40;
      totalCost = isSameCenter
        ? 110 + extraCost
        : 150 + extraCost + 40; // extra 40 for outside district
    }
  }

  setSubmittedData({ ...data, totalCost });
  console.log(submittedData);
    Swal.fire({
    title: 'Estimated Cost',
    text: `Estimated Delivery Cost: ৳${totalCost}`,
    icon: 'success',
    confirmButtonText: 'Okay',
    confirmButtonColor: '#6366f1', // Optional: customize color
  });

};


  // const confirmSubmission = () => {
  //   const finalData = {
  //     ...submittedData,
  //     creation_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  //   };

  //   console.log("Saved to DB:", finalData);
  //   toast.success("Parcel Info Saved Successfully!");
  //   setSubmittedData(null);
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Send a Parcel</h1>
      <p className="text-gray-500">Fill in the details to send your parcel</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Parcel Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Parcel Info</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Parcel Type */}
            <div>
              <label className="label">Parcel Type</label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  Please select parcel type
                </p>
              )}
            </div>

            {/* Parcel Name */}
            <div>
              <label className="label">Parcel Name</label>
              <input
                {...register("title", { required: true })}
                className="input w-full"
                placeholder="Describe your parcel"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  Parcel name is required
                </p>
              )}
            </div>

            {/* Parcel Weight (conditional) */}
            {parcelType === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  {...register("weight")}
                  className="input w-full"
                  placeholder="e.g., 2"
                />
              </div>
            )}
          </div>
        </section>

        {/* Sender & Receiver Info */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sender Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Sender Info</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("senderName", { required: true })} className="input w-full" placeholder="Sender Name" />
                <input {...register("senderContact", { required: true })} className="input w-full" placeholder="Contact Number" />
                <select {...register("senderRegion", { required: true })} className="select w-full">
                  <option value="">Select Region</option>
                  {regions.map((region,idx) => (
                    <option key={idx} value={region}>{region}</option>
                  ))}
                </select>
                <select {...register("senderServiceCenter", { required: true })} className="select w-full">
                  <option value="">Select Service Center</option>
                  {filteredSenderCenters.map((sc,idx) => (
                    <option key={idx} value={sc.name}>
                      {sc.name} {sc.district}
                    </option>
                  ))}
                </select>
                <input {...register("senderAddress", { required: true })} className="input w-full" placeholder="Pickup Address" />
                <textarea
                  {...register("pickupInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Pickup Instructions"
                />
              </div>
            </div>

            {/* Receiver Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Receiver Info</h2>
              <div className="grid grid-cols-1 gap-4">
                <input {...register("receiverName", { required: true })} className="input w-full" placeholder="Receiver Name" />
                <input {...register("receiverContact", { required: true })} className="input w-full" placeholder="Contact Number" />
                <select {...register("receiverRegion", { required: true })} className="select w-full">
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select {...register("receiverServiceCenter", { required: true })} className="select w-full">
                  <option value="">Select Service Center</option>
                  {filteredReceiverCenters.map((sc,idx) => (
                    <option key={idx} value={sc.name}>
                      {sc.name} {sc.district}
                    </option>
                  ))}
                </select>
                <input {...register("receiverAddress", { required: true })} className="input w-full" placeholder="Delivery Address" />
                <textarea
                  {...register("deliveryInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Instructions"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="btn btn-primary text-black" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
