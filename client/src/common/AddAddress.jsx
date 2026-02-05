import React, { useState } from 'react'
import { useAddAddressMutation } from '../../redux/authApi';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {

    const [state,setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode , setPincode] = useState('');
    const [destrict, setDestrict] = useState('');
    const [landmark , setLandmark] = useState('');
    const addressDetail = {state,city,pincode,destrict,landmark}

    const [addAddress, {data, isSuccess}] = useAddAddressMutation();
    console.log('addresdata=', data)
    const navigate = useNavigate();

    const handleSubmit = (e)=>{ 
        e.preventDefault();
        addAddress(addressDetail)
        if(isSuccess){
            navigate('/cartpage')
        }
    }

  return (
    <div>
        <div className='border w-1/2 mx-auto mt-24'>
            <form onSubmit={handleSubmit}>
                <h5 className='text-center p-2 font-serif bg-amber-200'>Add Address</h5>
                <div className='grid grid-cols-2 gap-3 p-4 bg-gray-100'>
                    
                <div className='flex gap-2 items-center'>
                    <label htmlFor="">State</label>
                    <input onChange={(e)=>setState(e.target.value)} style={{outline:'none'}} type="text" className='p-1 rounded border' />
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="">City</label>
                    <input onChange={(e)=>setCity(e.target.value)} style={{outline:'none'}} type="text" className='p-1 rounded border' />
                </div>

                 <div className='flex gap-2 items-center'>
                    <label htmlFor="">Destrict</label>
                    <input onChange={(e)=>setPincode(e.target.value)} style={{outline:'none'}} type="text" className='p-1 rounded border' />
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="">Pincode</label>
                    <input onChange={(e)=>setDestrict(e.target.value)} style={{outline:'none'}} type="number" className='p-1 rounded border' />
                </div>

                <div className='flex gap-2 items-center'>
                    <label htmlFor="">Landmark</label>
                    <textarea onChange={(e)=>setLandmark(e.target.value)} className='border w-full' style={{outline:'none'}} name="" id=""></textarea>
                </div>
                 <div>
                    <button type='submit' className='p-2 px-3 bg-green-500 text-white rounded hover:bg-green-400 duration-100'>Save</button>
                 </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddAddress