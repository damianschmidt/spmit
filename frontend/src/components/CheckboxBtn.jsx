import React, { useState } from "react";
import uniqid from "uniqid";

const CheckboxBtn = ({ value, lockers, setLockers }) => {
  const [btnActive, setBtnActive] = useState(false);

  const handleClick = (e) => {
    const btn = e.target;

    if (!btnActive) {
      btn.classList.add("chekcbox-btn-active");
      setLockers([...lockers, { text: value, id: uniqid() }]);
      setBtnActive(!btnActive);
    } else {
      btn.classList.remove("chekcbox-btn-active");
      setLockers(lockers.filter((e) => e.text !== value));
      setBtnActive(!btnActive);
    }
  };

  return (
    <button type="button" className="chekcbox-btn" onClick={handleClick}>
      {value}
    </button>
  );
};

export default CheckboxBtn;
