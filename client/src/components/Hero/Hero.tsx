import React from 'react'
import styled from 'styled-components';

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2500&q=80");
  background-size: cover;
  background-position: center;
`;



const  Hero =()  =>{
  return (
   <HeroComponent></HeroComponent>
  )
};

export default Hero;
