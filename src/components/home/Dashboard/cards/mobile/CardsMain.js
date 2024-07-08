// import React from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import CardUI from '../CardUI';
// import './cardsMain.css'
// import MobileCards from './MobileCards';
// import data from '../tpD';

// const CardsMain = () => {
//     const responsive = {
//         superLargeDesktop: {
//           breakpoint: { max: 4000, min: 3000 },
//           items: 6,
//         },
//         desktop: {
//           breakpoint: { max: 3000, min: 1024 },
//           items: 4,
//         },
//         tablet: {
//           breakpoint: { max: 1024, min: 464 },
//           items: 1,
//         },
//         mobile: {
//           breakpoint: { max: 464, min: 0 },
//           items: 1,
//         },
//     };
//   return (
//     <div>
//         <Carousel
//         responsive={responsive}
//         swipeable={true}
//         draggable={true}
//         centerMode={true}
//         infinite={true}
//         autoPlay={false}
//         arrows={false}
//         // autoPlaySpeed={3000}
//         keyBoardControl={true}
//         showDots={false}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-40-px"
//         className='cardMainC'
//       >
//       {/* <div className='cm-Main'>
//         <MobileCards/>
//       </div>
//       <div className='cm-Main'>
//         <MobileCards/>
//       </div>
//       <div className='cm-Main'>
//         <MobileCards/>
//       </div>
//       <div className='cm-Main'>
//         <MobileCards/>
//       </div> */}

//       {
//         data.map((val,idx)=>{
//           return(
//           <MobileCards name={val.name} val={val.val} />

//           )
//         })
//       }

//         {/* <MobileCards/>
//         <MobileCards/>
//         <MobileCards/>
//         <MobileCards/> */}

//       </Carousel>
//     </div>
//   )
// }

// export default CardsMain;



