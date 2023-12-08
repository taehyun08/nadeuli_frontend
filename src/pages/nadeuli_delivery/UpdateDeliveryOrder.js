import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import axios from "axios";

const UpdateDeliveryOrder = () => {
  // 배달 주문을 수정한다.
  const [nadeuliDeliveryDTO, setNadeuliDeliveryDTO] = useState(null);
  const [files, setFiles] = useState([]);
  const nadeuliDeliveryId = 28;
  useEffect(() => {
    axios
      .get(`/nadeulidelivery/getDeliveryOrder/${nadeuliDeliveryId}`)
      .then((response) => setNadeuliDeliveryDTO(response.data));
  }, []);

  const handleChange = (e) => {
    setNadeuliDeliveryDTO((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in nadeuliDeliveryDTO) {
      formData.append(key, nadeuliDeliveryDTO[key]);
    }
    for (const file of files) {
      formData.append("images", file);
    }

    axios
      .post("/nadeulidelivery/addDeliveryOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) =>
        console.log("배달 주문 완료!", response.data, response.status)
      )
      .catch((error) => console.log("주문 등록 실패", error));
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="form-row">
          <label>
            제목: <input type="text" name="title" onChange={handleChange} />$
            {nadeuliDeliveryDTO.title}
          </label>
          <label>
            내용: <input type="text" name="content" onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            상품명:{" "}
            <input type="text" name="productName" onChange={handleChange} />
          </label>
          <label>
            상품 가격:{" "}
            <input type="text" name="productPrice" onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            상품 수량:{" "}
            <input type="text" name="productNum" onChange={handleChange} />
          </label>
          <label>
            배달료:{" "}
            <input type="text" name="deliveryFee" onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            보증금: <input type="text" name="deposit" onChange={handleChange} />
          </label>
          <label>
            출발지:{" "}
            <input type="text" name="departure" onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>
            도착지: <input type="text" name="arrival" onChange={handleChange} />
          </label>
          <label>
            구매자태그:{" "}
            <input type="text" name="buyer.tag" onChange={handleChange} />
          </label>
          <label>
            구매자닉네임:{" "}
            <input type="text" name="buyer.nickname" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            이미지: <input type="file" multiple onChange={handleFileChange} />
          </label>
        </div>
        <button type="submit">주문 등록</button>
      </Form>
    </>
  );
};

export default UpdateDeliveryOrder;
