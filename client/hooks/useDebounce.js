import { useState } from "react"
import { useEffect } from "react"

const useDebouce = (value,delay)=>{
    const [debouncedVal, setDebouncedVal] = useState(value)
  useEffect(()=>{
     const handler = setTimeout(()=>{
         setDebouncedVal(value)
     },delay)
     return ()=>{
        clearTimeout(handler)
     }
  },[value,delay])

return debouncedVal
}

export default useDebouce