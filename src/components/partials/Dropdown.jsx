import React from 'react'

const Dropdown = ({title,options,func}) => {
  return (
   <div className='select mr-4'>
    <select onChange={func} defaultValue='0'name="format" id="format">
        <option className='' value="0" disabled>{title}</option>
        {options.map((o,i)=>(
          <option value={o}>{o.toUpperCase()}</option>
        ))}
    </select>
   </div>
  )
}

export default Dropdown