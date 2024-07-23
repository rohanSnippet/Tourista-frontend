import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <input
          type="checkbox"
          id="accordion-item-1"
          hidden
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <label htmlFor="accordion-item-1" className="accordion-item-title">
          {title}
        </label>
        <div className="accordion-item-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
