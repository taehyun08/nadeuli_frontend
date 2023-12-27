import Button from '@material-ui/core/Button';
import HeaderBack from "./HeaderBack";
import React from "react";
import { useEffect } from "react";

const NadeuliPay = ({ title, buttonName , handleButton, inputNumber, setInputNumber, setPayMoney }) => {

    useEffect(() => {
      setPayMoney(inputNumber);
    }, [inputNumber]);
  
    return (
      <div style={{ marginTop: '20px', marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeaderBack title={title} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center align
          }}
        >
          <img src="/nadeuli_icon.ico" alt="NadeuliPay" style={{ display: 'block',  marginTop: '200px' }} />
          <input
            type="number"
            placeholder="금액을 입력해주세요."
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            style={{
              marginTop: '10%',
              marginBottom: '60px',
              padding: '10px',
              width: '250px', // Adjust width
            }}
          />
          <Button
            variant="contained"
            disableElevation
            style={{ backgroundColor: '#1976d2', color: 'white', marginBottom: '10px' }}
            onClick={handleButton}
          >
            {buttonName}
          </Button>
        </div>
      </div>
    );
  };
  
  export default NadeuliPay;