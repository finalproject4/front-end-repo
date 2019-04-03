import React, { Component } from "react";
import "./App.css";

class Landing extends Component {

 

       state = {
    activeSlideIndex: 0
}
  
    slides = [
        "https://www.fourseasons.com/content/dam/fourseasons/images/web/RIY/RIY_191_aspect16x9.jpg/jcr:content/renditions/cq5dam.web.468.263.jpeg",
        "https://imagesawe.s3.amazonaws.com/listing/2019/01/31/the_ritz_carlton_hotel.jpg",
        "http://isct2018.com/wp-content/uploads/2016/07/windsor-banquet-hall-montreal-versailles-ballroom-french-renaissance-decor-wedding-honour-table-blue-lighting-1024x680.jpg",
        "https://www.traditionslighting.com/wp-content/uploads/2017/03/magical-wedding-lighting-ideas-02_detail.jpg"
    ] 

    slidesInterval = setInterval(() => {
        this.nextSlide("+")
    } , 2000)

    nextSlide = (n) => {

        let activeSlideIndex; 

        if(n === "+") {
            activeSlideIndex = this.state.activeSlideIndex + 1; 
            if (activeSlideIndex  < this.slides.length ){
                this.setState({ activeSlideIndex })
            } else {
                this.setState({ activeSlideIndex: 0 })
            }
        } else if (n === "-") {
            activeSlideIndex = this.state.activeSlideIndex - 1;
            if (activeSlideIndex > -1) {
                this.setState({ activeSlideIndex })
            } else {
                this.setState({ activeSlideIndex: this.slides.length -1  })
            }
        }

    }

   componentWillUnmount(){
       clearInterval(this.slidesInterval)
   }

    render() {
        return (
            <div className="notuse">
                <img class="mySlides" id="c" src={this.slides[this.state.activeSlideIndex]}/>
                <div id="border"></div>
           
                <p className="paragraph">   لا تشيل هم <span>مناسبتك!</span> رتبها معنا </p>
        </div> )
    }
}
export default Landing;
