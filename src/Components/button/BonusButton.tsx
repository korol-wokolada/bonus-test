import React from "react";
import "./BonusButton.css";
import fire from "./../../Img/fire.png";
import next from "./../../Img/buttonImg.png";

type props = {
  currentQuantity: number | undefined;
  dateBurning: string | undefined;
  forBurningQuantity: number | undefined;
};

function BonusButton({
  currentQuantity,
  dateBurning,
  forBurningQuantity,
}: props) {
  const date = dateBurning ? new Date(dateBurning) : null;
  const dateBurningBonus = `${date?.toLocaleDateString().slice(0, 5)} сгорит `;
  const burningBonus = ` ${forBurningQuantity} бонусов`;

  return (
    <div className="bonusButton">
      <p className="bonus-button-text">{currentQuantity} бонусов</p>
      <div>
        <p className="fire-bonus-text">
          {dateBurningBonus}
          <img src={fire} alt="fire" className="fire" /> {burningBonus}
        </p>
        <button className="next-button-img">
          <img src={next} alt="next" />
        </button>
      </div>
    </div>
  );
}

export default React.memo(BonusButton);
