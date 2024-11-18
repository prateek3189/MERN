import React from "react";

import "./Map.css";

const Map = (props) => {
  return (
    <div className={`map #{props.className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786541102883!2d55.271801475381785!3d25.19719697771105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sin!4v1731830620488!5m2!1sen!2sin"
        width="100%"
        style={{ border: 0, height: "20rem" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
