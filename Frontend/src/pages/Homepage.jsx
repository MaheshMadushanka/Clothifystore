import React, { useEffect, useState } from "react";
import PhotoLabel from "../components/UserComponents/Label/PhotoLabel";
import BrandShowcase from "../components/UserComponents/Label/BrandLabel";
import './Homepage.css'

import Men1 from "../../public/image/promo_bau_hp_mw_01.jpg"
import Men2 from "../../public/image/promo_bau_hp_mw_02-(1).jpg"
import Men3 from "../../public/image/promo_bau_hp_mw_03.jpg"
import Men4 from "../../public/image/promo_bau_hp_mw_04.jpg"

import Women1 from "../../public/image/promo_bau_hp_ww_01v2.jpg"
import Women2 from "../../public/image/promo_bau_hp_ww_02-(1).jpg"
import Women3 from "../../public/image/promo_bau_hp_ww_03.jpg"
import Women4 from "../../public/image/promo_bau_hp_ww_04.jpg"
import { size } from "@cloudinary/url-gen/qualifiers/textFit";






const Homepage = () => {
  const Men=[
    {
      image: Men1,
    },
    {
      image: Men2,
    },
    {
      image: Men3,
    },
    {
      image: Men4,
    },
  ];
  const [Kid,setKid]=useState([]);
  const Women=([
    {
      image:Women1 ,
    },
    {
      image: Women2,
    },
    {
      image: Women3,
    },
    {
      image: Women4,
    },
  ]);

  useEffect(()=>{
    
    // fetchImage("3",setMen);
    // fetchImage("1",setKid);
    // fetchImage("2",setWomen);
  },[]);

  const fetchImage = async (category,setState)=>{
    try{
      const respond=await fetch(`http://localhost:8081/product/${category}}`);
      const data=await respond.json();
      setState(data);
  
  }catch(error){
    console.error("Error fetching images:", error);
  }
  }
    
   
      return (<div>
      <PhotoLabel />
      <h1 className="section-title">
       FOR MEN
        </h1>

      <BrandShowcase brands={Men}/>
      {/* <BrandShowcase brands={Kid}/>*/}
      <h1 className="section-title">
       FOR WOMEN
        </h1>
      <BrandShowcase brands={Women}/> 
      </div>
    );
    
  
  };
  
  export default Homepage;
  