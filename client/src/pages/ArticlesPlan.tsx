import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      "http://localhost:8080/subs/prices"
    );
    console.log(response);
    setPrices(response.data);
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:8080/subs/session",
      {
        priceId,
      }
    );

    window.location.href = response.url;
  };

  const backgroundColors: any = {
    Basic: "lightgreen",
    Standard: "lightcoral",
    Premium: "lightpink",
  };

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => {
          return (
            <Card
              key={price.id}
              style={{ width: "18rem", height: "25rem", marginRight: "2rem" }}
            >
              <CardHeader
                style={{ backgroundColor: backgroundColors[price.nickname] }}
              >
                <PriceCircle>
                  <PriceText>${price.unit_amount / 100}</PriceText>
                </PriceCircle>
              </CardHeader>
              <Card.Body>
                <Card.Title style={{ fontSize: "2rem" }}>
                  {price.nickname}
                </Card.Title>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => createSession(price.id)}
                >
                  Buy now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default ArticlesPlan;
