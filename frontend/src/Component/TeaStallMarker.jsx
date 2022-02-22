import {Icon} from '@iconify/react'
import teastallmaker from '@iconify/icons-mdi/letter-t-circle-outline'

const TeaStallsMarker = ({lat,lng,onClick}) => {
  return (
    <div className='Tea-stalls-marker' onClick={onClick}>
         <Icon icon={teastallmaker} className="Tea-stall-icon"/>
    </div>
  )
}

export default TeaStallsMarker