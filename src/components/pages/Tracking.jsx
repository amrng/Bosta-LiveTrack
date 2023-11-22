import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Status from './Status';
import callCenter from '../../assets/Call-Center.png'

export default function Tracking() {

  const { trackedData } = useSelector( (state) => state.track)
  const [Current, SetCurrent] = useState("")

  useEffect(()=> {
    SetCurrent(trackedData?.CurrentStatus?.state)
  }, [Current, trackedData])

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  }
 

  return (
    <div className='container mx-auto my-16'>
      {trackedData?.CurrentStatus?.state ?
      <>
      {/* Awl Divaya */}
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
          at {new Date(trackedData?.CurrentStatus?.timestamp)
          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        </div>
        {/* Provider */}
        <div className="flex flex-col mb-2">
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Seller Name</p>
          <p className='text-xl font-semibold'>{trackedData?.provider}</p>
        </div>
        {/* Delevering Date */}
        <div className="flex flex-col mb-2">
          <p className='text-gray-400 mb-2 font-semibold text-sm'>Delevering Date</p>
          {trackedData?.PromisedDate ? <>
          <p className='text-xl font-semibold'>{new Date(trackedData?.PromisedDate)
          .toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
          at {new Date(trackedData?.PromisedDate)
          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p></> : ""}
          
        </div>
      </div>

      {/* // Tany Divaya */}
      <div className='border rounded-es-lg border-t-0 rounded-ee-lg p-6 mb-7'>
        <Status Current={Current}/>
      </div>

      {/* // Talet Divaya */}
      <div className='flex flex-wrap justify-center w-full'>
        <div className='lg:w-[60%] mx-0 min-w-[550px] lg:ml-5 md:ml-0 mb-5'>
        <p className='ps-4 mb-3'>Shipment Details</p>
        <table className="table-auto w-full  border rounded-3xl">
          <thead className='bg-gray-100 text-gray-400 h-12'>
            <tr>
              <th className='text-start ps-3'>Branch</th>
              <th className='text-start ps-3'>Date</th>
              <th className='text-start ps-3'>Time</th>
              <th className='text-start ps-3'>Details</th>
            </tr>
          </thead>
          <tbody>
            {trackedData?.TransitEvents
            ?.filter((det)=> det.state === "TICKET_CREATED" 
            || det.state === "PACKAGE_RECEIVED" 
            || det.state === "OUT_FOR_DELIVERY" 
            || det.state === "DELIVERED" || det.state === "DELIVERED_TO_SENDER" || det.state === "CANCELLED")
            ?.map((detail)=> <tr className='h-12'>
              <td className='ps-3'>Nasr City</td>
              <td  className='ps-3'>{new Date(detail?.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td  className='ps-3'>{new Date(detail?.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td  className='ps-3'>{detail?.state}</td>
            </tr>)}
            
          </tbody>
        </table>
        </div>

        <div className='max-w-[33.33%]  min-w-[350px] mx-auto'>
          <p className='ps-4 mb-3'>Shipment Details</p>

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
      <div className='flex flex-col items-center justify-center mt-52'>
        <i className="fa-solid fa-truck-fast fa-2xl md:scale-150 sm:scale-100 text-gray-400 mb-10"></i>
        <h1 className='md:text-4xl sm:text-lg text-gray-400 font-semibold '>Please use Track shipment to get details</h1>
      </div>}
    </div>
  )
}
