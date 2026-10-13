import Link from 'next/link'
import React from 'react'

export default function Gallery() {
  return <> 
  
  <div> 
    <h2>Gallery page</h2> 

    <div className='bg-amber-300 p-5'> 
      <div className="w-3/12"> 
      Gallery componets 
      </div> 
      <div className="w-2/12 p-3"> 
        <ul className='flex flex-col '>
          <li> 
            <Link href={'/gallery/web'}>web</Link>
          </li> 

          <li> 
              <Link href={'/gallery/mobile'}>Mobile</Link>
          </li>
        </ul>
      </div> 

    </div>
  </div>
  
  </>
}
