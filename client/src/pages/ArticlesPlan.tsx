import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const ArticlesPlan = () =>{
    const [prices , setPrices] =  useState<any []>([]);

    useEffect(() => {
        fetchPrices();
    })
}