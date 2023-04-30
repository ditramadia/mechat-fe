import getConfig from 'next/config';
import { useState, useEffect } from 'react';
import React, { MouseEvent } from 'react';


const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const history = [
    {
      id: 1,
      message: 'Hello',
    },
    {
      id: 2,
      message: 'Hi',
    },
    {
      id: 3,
      message: 'How are you?',
    },
    {
      id: 4,
      message: 'I am fine, thank you',
    }
  ]

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, inputText]);
    setInputText('');
  };

  return (
    <div className='bg-[#2C3333] h-auto relative'>
      <div className='flex'>
        <div className='h-screen w-1/4'></div>
        <div className='w-1/4 h-screen fixed'>
          <div className='bg-[#2E4F4F] h-[70%] font-[Montserrat-Medium] text-white text-[50px] pt-[10px]'>
            <div className='h-1/5 flex justify-center' style={{ filter: 'drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.25))' }}>History</div>
            <div className='h-4/5 mt-[-10px]'>
              {history.map((item) => (
                <div key={item.id} className='h-[20%] bg-[#608C8C] mx-[40px] mb-[5%] rounded-[20px] text-[15px] px-[20px] flex items-center' style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>
                  {item.message}
                </div>
              ))}
            </div>
          </div>
          <div className='h-[0.5%]'></div>
          <div className='bg-[#2E4F4F] h-[29.5%] font-[Montserrat-Medium] text-white text-[50px] pt-[10px]'>
            <span className='flex justify-center' style={{ filter: 'drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.25))' }}>Algorithm</span>
            <div className="pl-[60px]">
              <div className="flex mt-[20px]">
                <input type="radio" className="form-radio" name="algorithm" value="KMP" />
                <div className="pl-2 text-[20px] mt-[-7px]" style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>Knuth-Morris-Prat</div>
              </div>
              <div className="flex mt-[20px]">
                <input type="radio" className="form-radio" name="algorithm" value="BM" />
                <div className="pl-2 text-[20px] mt-[-7px]" style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>BM</div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-3/4 relative'>
          <div className='messages-container h-auto mt-[50px] mb-[100px] right-0'>
          {messages.map((message, index) => (
            <div>
              <div className='text-right'>
                <div key={index} className='inline-block bg-[#569DAA] py-2 px-[25px] rounded-[20px] my-[10px] mx-[50px]' style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>
                  {message}
                </div> 
              </div>
              <div className='block'>
                <div key={index} className='inline-block bg-[#608C8C] py-2 px-[25px] rounded-[20px] my-[10px] mx-[50px]' style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>
                  iya sumpah gangerti lagi gua anjg
                </div> 
              </div>
            </div>
          ))}
          </div>
          <form onSubmit={handleSubmit} className='input-container fixed bottom-0 right-0 w-3/4'>
            <div className='flex'>
              <input
                type='text'
                value={inputText}
                onChange={handleInput}
                placeholder='Insert your question here...'
                className='w-full py-2 pl-[25px] rounded-[20px] my-[20px] ml-[40px] bg-[#2E4F4F] text-white' style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}
              />
              <button type='submit' className='w-[8%] bg-[#2E4F4F] text-white px-4 py-2 my-[20px] mx-[30px] rounded-[20px]' style={{ filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))' }}>
                &gt;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
