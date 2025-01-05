import React from 'react'
import CustomerData from '../../Components/CustomerData'
import { customersDataList } from '../../Components/Common/Helper'

function Users() {
  return (
    <div className='p-4'>
        <h2 className='text-black font-medium text-2xl xl:text-[28px]'>Users  List</h2>
        <p className='font-normal text-sm xl:text-base text-black mt-1'>Plan, prioritize, and accomplish your tasks with ease.</p>
        <CustomerData mapData={customersDataList}/>
    </div>
  )
}

export default Users