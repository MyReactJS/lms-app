
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { Component } from 'react';


function MyCarousel() {
    return (
           
            <Carousel showThumbs={false} infiniteLoop={true} showIndicators={false} showArrows={true} autoPlay={true}>
                <div>
                    <img src='./img/1.jpg' alt="img1" />

                </div>
                <div>
                    <img src='./img/2.jpg' alt="img2" />
                </div>
                <div>
                    <img src='./img/3.jpg' alt="img3" />
                </div>
              

            </Carousel>
        
    );

}

export default MyCarousel;
