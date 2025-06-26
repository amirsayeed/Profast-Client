import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};


const SendParcel = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  // const [submittedData, setSubmittedData] = useState(null);

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

  const onSubmit = async (data) => {
  const { type, weight = 0, senderServiceCenter, receiverServiceCenter } = data;

  const isSameCenter = senderServiceCenter === receiverServiceCenter;
  const weightValue = parseFloat(weight);
  let totalCost = 0;
  let breakdown = "";

  if (type === "document") {
    totalCost = isSameCenter ? 60 : 80;
    breakdown = `
      <strong>Parcel Type:</strong> Document<br/>
      <strong>Delivery Type:</strong> ${isSameCenter ? "Within City (Same Center)" : "Outside City (Different Center)"}<br/>
      <strong>Flat Rate:</strong> ৳${totalCost}<br/>
      <hr class="my-2"/>
      <strong>Total Cost:</strong> ৳${totalCost}
    `;
  } else {
    const baseCost = isSameCenter ? 110 : 150;
    let extraCost = 0;
    let surcharge = 0;

    if (weightValue > 3) {
      const extraKg = weightValue - 3;
      extraCost = extraKg * 40;
      if (!isSameCenter) {
        surcharge = 40;
      }
    }

    totalCost = baseCost + extraCost + surcharge;

    breakdown = `
    <strong>Parcel Type:</strong> Non-Document<br/>
    <strong>Weight:</strong> ${weightValue}kg<br/>
    <strong>Delivery Type:</strong> ${isSameCenter ? "Within City (Same Center)" : "Outside City (Different Center)"}<br/>
    <hr class="my-2"/>
    <strong>Breakdown:</strong><br/>
    Base Cost (up to 3kg): ৳${baseCost}<br/>
    ${extraCost > 0 ? `Extra Weight Charge: (${weightValue - 3}kg × ৳40) = ৳${extraCost}<br/>` : ""}
    ${surcharge > 0 ? `Outside City Surcharge: ৳${surcharge}<br/>` : ""}
    <hr class="my-2"/>
    <strong style="font-size: 18px;">Total Cost:</strong> 
    <span style="font-size: 18px; color: green;">৳${totalCost}</span>
  `;
  }

  const result = await Swal.fire({
    title: "Review Parcel Pricing",
    html: `
      <div class="text-left leading-6">
        ${breakdown}
      </div>
    `,
    icon: "info",
    showCancelButton: false,
    showDenyButton: true,
    confirmButtonText: "Proceed to Payment",
    denyButtonText: "Edit Info",
    confirmButtonColor: "#10b981", // green
    denyButtonColor: "#3b82f6",    
  });

  if (result.isConfirmed) {
    const parcelData = {
      ...data,
      totalCost,
      created_by: user.email,
      payment_status: 'unpaid',
      delivery_status: 'not_collected',
      creation_date: new Date().toISOString(),
      trackingId: generateTrackingID()
    };

    console.log("Proceeding with:", parcelData);

    //save data to server
    axiosSecure.post('/parcels', parcelData)
    .then(res=>{
      console.log(res.data)
      if(res?.data.insertedId){
        Swal.fire({
          title: "Success!",
          text: "Parcel info submitted. Redirecting to payment...",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    })
    .catch(error=>{
      console.log(error)
    })

  }
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
