import axios from "axios";
import { useEffect, useState } from "react";

const WebCrawler = ({ searchQuery, onAveragePriceChange }) => {
  const [isPriceCalculated, setIsPriceCalculated] = useState(false);

  // searchQuery가 변경될 때마다 isPriceCalculated를 false로 초기화
  useEffect(() => {
    setIsPriceCalculated(false);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && !isPriceCalculated) {
      axios
        .post("http://localhost:3001/api/search", { query: searchQuery })
        .then((response) => {
          const prices = response.data.prices;

          // 평균 가격 계산
          const total = prices.reduce((acc, price) => acc + price, 0);
          const average = total / prices.length;

          // 평균 가격의 3분의 1 계산
          const oneThirdOfAverage = Math.floor(average / 3);
          onAveragePriceChange(oneThirdOfAverage);
          // 가격 계산이 완료됨을 표시
          setIsPriceCalculated(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchQuery, onAveragePriceChange, isPriceCalculated]);

  return null;
};

export default WebCrawler;
