import React from 'react';

import Record from '../SingleRecord/Record.js';
import LoadingSpinner from '../LoadingSpinner.js';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NextArrow, PrevArrow } from './SliderArrow';

export default function SimpleExpansionPanel({ records }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <div>
        {console.log('records', records)}
        <Carousel
          swipeable
          draggable
          responsive={responsive}
          infinite={false}
          arrows
          minimumTouchDrag={80}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          // customLeftArrow={<PrevArrow />}
          // customRightArrow={<NextArrow />}
        >
          {records
            ? records.map(record => <Record key={record._id} {...record} />)
            : []}
        </Carousel>
      </div>

      {!records && (
        <div
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <LoadingSpinner />}
        </div>
      )}
    </>
  );
}
