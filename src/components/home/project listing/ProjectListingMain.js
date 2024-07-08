import React, { useState } from 'react'
import PLimg from './project List component/pl head/PLimg'
import PLList from './project List component/Pro List Table/PLList'
import './projectListMain.css';
import PLMCards from './project List component/Pro List Mobile/PLMCards';
import WidthScreen from '../WidScr';
import MSort from './project List component/Pro List Mobile/MSort';
import { Offcanvas, Stack } from 'react-bootstrap';

const ProjectListingMain = () => {
  const width = WidthScreen();
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);


  return (
    <div className='projectListMain1'>

      <div className='projectListPLimg'>
        <PLimg/>
      </div>

      <div className='projectListPLList'>
        {
          width > 700 ?
          <PLList/>
          :
          <PLMCards/>
        }
      </div>


      {/* <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement='bottom' 
        // scroll={true}
        className='ofCanPLM'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fs-4'>Sort Projects By</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div>
            <Stack direction='vertical' gap={4}>
              <div>hi</div>
              <div>hi</div>
              <div>hi</div>
              <div>hi</div>
              <div>hi</div>
              <div>hi</div>
            </Stack>
          </div>
        </Offcanvas.Body>

      </Offcanvas> */}



    </div>
  )
}

export default ProjectListingMain



