import React, { useCallback, useEffect, useState } from "react";
import BonusButton from "../button/BonusButton";
import "./bonusPage.css";
import icon from "./../../information-button1.png";

type Result = {
  currentQuantity: number | undefined;
  dateBurning: string | undefined;
  forBurningQuantity: number | undefined;
  typeBonusName: string | undefined;
};

type codeResult = {
  codeResult: number;
  duration: number;
  idLog: string;
  message: string;
  messageDev: null;
  status: number;
};

type accessToken = {
  accessToken: string;
  result: codeResult;
};

type data = {
  data: Result;
  resultOperation: codeResult;
};

function BonusPage() {
  const [bonusDate, setBonusDate] = useState<Result>();
  console.log("first");
  const fetchDate = useCallback(async () => {
    const user = {
      idClient: "2c44d8c2-c89a-472e-aab3-9a8a29142315",
      accessToken: "",
      paramName: "device",
      paramValue: "7db72635-fd0a-46b9-813b-1627e3aa02ea",
      latitude: 0,
      longitude: 0,
      sourceQuery: 0,
    };

    try {
      let response = await fetch(
        "http://84.201.188.117:5021/api/v3/clients/accesstoken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            AccessKey: "891cf53c-01fc-4d74-a14c-592668b7a03c",
          },
          body: JSON.stringify(user),
        }
      );

      let { accessToken }: accessToken = await response.json();
      let data: data = await fetch(
        `http://84.201.188.117:5003/api/v3/ibonus/generalinfo/${accessToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            AccessKey: "891cf53c-01fc-4d74-a14c-592668b7a03c",
          },
        }
      ).then((res) => res.json());

      setBonusDate(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDate();
  }, [fetchDate]);

  return (
    <>
      <div className="wrapper">
        <div className="logo">Логотип</div>
        <img src={icon} alt="icon" className="inform-image" />
      </div>
      <BonusButton
        currentQuantity={bonusDate?.currentQuantity}
        dateBurning={bonusDate?.dateBurning}
        forBurningQuantity={bonusDate?.forBurningQuantity}
      />
    </>
  );
}

export default BonusPage;
