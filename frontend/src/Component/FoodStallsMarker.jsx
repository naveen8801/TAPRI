import {Icon} from '@iconify/react'
import foodstallmaker from '@iconify/icons-mdi/letter-f-box-outline'

const FoodStallsMarker = ({lat,lng,onClick}) => {
  return (
    <div className='Food-stalls-marker'>
         <Icon icon={foodstallmaker} className="Food-stall-icon"/>
    </div>
  )
}

export default FoodStallsMarker