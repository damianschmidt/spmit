import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

const CheckboxBtn = ({ value, lockers, setLockers, active }) => {
  const [btnActive, setBtnActive] = useState(false);
  const [classes, setClasses] = useState("chekcbox-btn");

  useEffect(() => {
    if (active) {
      setClasses("chekcbox-btn chekcbox-btn-active");
      setBtnActive(true);
    }
  }, [active, btnActive]);

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
    <button type="button" className={classes} onClick={handleClick}>
      {value}
    </button>
  );
};

export default CheckboxBtn;
