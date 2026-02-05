import React from 'react'
import { useSingleProductQuery } from '../../redux/authApi';
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams();
    const {data} = useSingleProductQuery(params?.id)
    console.log('detail==', data)
    
  return (
    <div>
      <div>
        Product Details
      </div>
    </div>
  )
}

export default ProductDetail