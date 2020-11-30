import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

const CheckboxBtn = ({
  value,
  lockers,
  setLockers,
  active,
  lockersForomFile,
}) => {
  const [btnActive, setBtnActive] = useState(false);
  const [classes, setClasses] = useState("chekcbox-btn");

  useEffect(() => {
    if (active) {
      setClasses("chekcbox-btn chekcbox-btn-active");
      lockersForomFile.push({ text: value, id: uniqid() });
      setBtnActive(true);
    } else {
      setClasses("chekcbox-btn");
      const position = [...lockersForomFile].map((e) => e.text).indexOf(value);
      [...lockersForomFile].splice(position, 1);
      setBtnActive(false);
    }

    setLockers(lockersForomFile);
  }, [active, value]);

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
