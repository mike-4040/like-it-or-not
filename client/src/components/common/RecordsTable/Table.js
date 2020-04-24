import React from 'react';

import Record from '../SingleRecord/Record.js';
import LoadingSpinner from '../LoadingSpinner.js';

import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from './SliderArrow';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SimpleExpansionPanel({ records, setRecords }) {
  const settings = {
    accessibility: true,
    arrows: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 15000,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow to='prev' />,
    nextArrow: <SampleNextArrow to='next' />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          {records &&
            records.map(record => (
              <Record key={record._id} {...record} setRecords={setRecords} />
            ))}
        </Slider>
      </div>
      {!records && <LoadingSpinner />}
    </>
  );
}
