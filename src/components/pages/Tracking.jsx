import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Status from '../Status';
import callCenter from '../../assets/Call-Center.png'

export default function Tracking() {

  const { trackedData, error } = useSelector( (state) => state.track)
  const [Current, SetCurrent] = useState("")

  useEffect(()=> {
    SetCurrent(trackedData?.CurrentStatus?.state)
  }, [Current, trackedData])

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  }
 

  return (
    <div className='w-full md:px-12 sm:px-4 mx-auto mt-36 mb-16'>
      {trackedData?.CurrentStatus?.state ?
      <>
      {/* Shipment */}
      <div className='flex flex-wrap justify-between border rounded-ss-lg rounded-se-lg p-6'>
        {/* Shipment no and status */}
        <div className='flex flex-col mb-2'>
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Tracking Number {trackedData?.TrackingNumber}</p>
          {trackedData?.CurrentStatus?.state === "DELIVERED" 
          ? <p className='text-xl font-semibold text-green-500'>Delivered</p>
          : trackedData?.CurrentStatus?.state === "CANCELLED"
          ? <p className='text-xl font-semibold text-red-600'>Cancelled</p>
          : <p className='text-xl font-semibold text-yellow-400'>Shipment Returned</p>}
        </div>
        {/* Last Update */}
        <div className="flex flex-col mb-2">
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Last Update</p>
          <p className='text-xl font-semibold'>{new Date(trackedData?.CurrentStatus?.timestamp)
          .toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
          {" "}at {new Date(trackedData?.CurrentStatus?.timestamp)
          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        </div>
        {/* Provider */}
        <div className="flex flex-col mb-2">
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Seller Name</p>
          <p className='text-xl font-semibold'>{trackedData?.provider}</p>
        </div>
        {/* Delevering Date */}
        <div className="flex flex-col mb-2">
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Delivering Date</p>
          {trackedData?.PromisedDate ? <>
          <p className='text-xl font-semibold'>{new Date(trackedData?.PromisedDate)
          .toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
          {" "}at {new Date(trackedData?.PromisedDate)
          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p></> : ""}
          
        </div>
      </div>

      {/* Status Bar */}
      <div className='border rounded-es-lg border-t-0 rounded-ee-lg py-6 mb-7'>
        <Status Current={Current}/>
      </div>

      {/* Table and call center */}
      <div className='flex flex-wrap justify-center w-full'>
        <div className='lg:w-[60%] sm:w-full mx-0  lg:ml-5 md:ml-0 mb-5'>
        <p className='ps-4 mb-3 font-semibold'>Shipment Details</p>
        <table className="table-auto w-full  border rounded-3xl">
          <thead className='bg-gray-100 text-gray-400 h-12'>
            <tr>
              <th className='text-start ps-3'>Branch</th>
              <th className='text-start ps-3'>Date</th>
              <th className='text-start ps-3'>Time</th>
              <th className='text-start ps-3'>Details</th>
            </tr>
          </thead>
          <tbody key={+trackedData?.TrackingNumber}>
            {trackedData?.TransitEvents
            ?.filter((det)=> det.state === "TICKET_CREATED" 
            || det.state === "PACKAGE_RECEIVED" 
            || det.state === "OUT_FOR_DELIVERY" 
            || det.state === "DELIVERED" || det.state === "DELIVERED_TO_SENDER" || det.state === "CANCELLED")
            ?.map((detail)=> <tr key={trackedData?.TrackingNumber} className='h-12'>
              <td  className='ps-3'>Nasr City</td>
              <td  className='ps-3'>{new Date(detail?.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td  className='ps-3'>{new Date(detail?.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td  className='ps-3'>
                {detail?.state === "TICKET_CREATED" 
                ? "Shipment Created" 
                : detail?.state === "PACKAGE_RECEIVED"
                ? "Package Received"
                : detail?.state === "OUT_FOR_DELIVERY"
                ? "Out For Delivery"
                : detail?.state === "DELIVERED"
                ? "Delivered"
                : detail?.state === "DELIVERED_TO_SENDER"
                ? "Shipment Back To provider"
                : "Cancelled"}</td>
            </tr>)}
            
          </tbody>
        </table>
        </div>

        <div className='lg:w-[33.33%]  sm-w-[300px] sm:mx-auto mx-auto'>
          <p className='ps-4 mb-3 font-semibold'>Shipment Details</p>

          <div className='mb-3 rounded-lg border p-4 text-gray-600 bg-gray-100'>
              <p>إمبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 33 القاهرة</p>
          </div>

          <div className='flex flex-wrap justify-evenly items-center rounded-lg border p-2'>
              <div className='me-4'>
                <p className='mb-2 font-semibold'>Is there any problem ?!</p>
                <button onClick={()=> handleCall(trackedData?.SupportPhoneNumbers[0])} 
                className='bg-red-600 text-white w-full py-2 rounded-xl'>Report problem</button>
              </div>

              <div>
                <img className='w-40' src={callCenter} alt="Problem reporting" />
              </div>
          </div>
        </div>
      </div>
      </>
      : 
      // if invalid tracking number
      error ? <div className='flex flex-col items-center justify-center mt-52 text-center'>
        <i className="fa-solid fa-truck-fast fa-2xl md:scale-150 sm:scale-100 text-gray-400 mb-10"></i>
        <h1 className='md:text-4xl sm:text-lg text-gray-400 font-semibold '>{error}</h1>
      </div> :
      // if there is no data
      <div className='flex flex-col items-center justify-center mt-60 text-center'>
        <i className="fa-solid fa-truck-fast fa-2xl md:scale-150 sm:scale-100 text-gray-400 mb-10"></i>
        <h1 className='md:text-4xl sm:text-lg text-gray-400 font-semibold mb-4'>Please use Track shipment to get details</h1>
        <h2 className='md:text-xl sm:text-base text-red-300 font-semibold'>
          For example: 7234258 - 13737343 - 67151313
        </h2>
      </div>}
    </div>
  )
}
