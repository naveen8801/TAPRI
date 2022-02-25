import React from 'react'

const LocationInfo = ({info}) => {
    console.log(info.name);
    console.log(info.phone);
  return (
    <div className='Loaction-info'>
        <li>Name:<strong>{info.Name}</strong></li>
        <li>Phone:<strong>{info.Phone}</strong></li>
        <button className='button-direction'>DIRECTION</button>
    </div>
    
    )
}

export default LocationInfo