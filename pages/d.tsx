import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import React, { MouseEvent } from 'react';


const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  const [text, setText] = useState("");

  const typeText = (textToType) => {
    let i = 0;
    setInterval(() => {
      setText((prevText) => prevText + textToType.charAt(i));
      i++;
    }, 100);
  };

  useEffect(() => {
    typeText("Hello, World!s");
  }, []);

  return (
    <div className="text-gray-800 text-lg font-medium">
    {text}
  <span className="animate-blink ml-1">|</span>
</div>
  );
};

export default Home;
