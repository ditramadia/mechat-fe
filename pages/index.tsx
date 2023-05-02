import React, { MouseEvent } from 'react';
import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import profile from '@src/assets/images/profile.png';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

import Record from './database.JSON';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  const [isKMP, setIsKMP] = useState(true);
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState(Record[Record.length - 1]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var newData = data;
    newData.messages.push(inputText);
    newData.messages.push('Pertanyaan tidak ada di database');
    setData(newData);
    Record.push(newData);
    setInputText('');
    // dihandle di backend
  };

  const handleNewChat = () => {
    Record.push({
      id: Record.length,
      messages: [],
    });
    // dihandle di backend
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className="bg-[#049c63] w-1/5 h-full flex flex-col justify-between"
        style={{
          filter: 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.5))',
        }}>
        {/* History */}
        <div className="w-full flex-col py-[20px]">
          <h2 className="text-white font-[Montserrat-Bold] text-[24px] text-center">
            History
          </h2>
          <div className="history-container w-full h-[570px] flex-col overflow-y-scroll">
            {Record.map((conversation, index) => (
              <button
                onClick={() => {
                  setData(Record[conversation.id]);
                  console.log(conversation.id, data.id);
                }}
                key={conversation.id}
                className={`${
                  data.id == index
                    ? 'border-[#f3f3f3] bg-[#f3f3f3] text-[#049c63]'
                    : 'border-[#049c63] bg-[#049c63] text-[#f3f3f3]'
                } h-[38px] overflow-hidden rounded-[8px] py-2 px-5 my-3 mx-auto w-10/12 cursor-default text-left ml-7`}>
                {conversation.messages.length == 0
                  ? 'New chat'
                  : conversation.messages[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithms */}
        <div className="w-full h-fit flex-col py-[20px]">
          {/* New Chat Button */}
          <div className=" w-full flex flex-col justify-center items-center">
            <button
              onClick={handleNewChat}
              className="bg-[#049c63] text-[#f3f3f3] border-[#f3f3f3] border-2 rounded-[8px] py-2 my-3 w-10/12 text-center cursor-pointer mx-auto hover:bg-[#f3f3f3] hover:text-[#049c63]">
              New chat
            </button>
          </div>
          <div className="w-11/12 h-[2px] bg-[#fefefe] mx-auto my-[20px]"></div>
          <h2 className="text-white font-[Montserrat-Bold] text-[24px] text-center">
            Algorithm
          </h2>
          <div className=" w-full flex flex-col justify-center items-center">
            <button
              onClick={() => setIsKMP(true)}
              className={`${
                isKMP
                  ? 'bg-[#f3f3f3] text-[#049c63]'
                  : 'bg-[#049c63] text-[#f3f3f3]'
              } border-[#f3f3f3] border-2 rounded-[8px] py-2 my-3 w-10/12 text-center cursor-pointer mx-auto`}>
              Knuth-Morris-Prat
            </button>
            <button
              onClick={() => setIsKMP(false)}
              className={`${
                !isKMP
                  ? 'bg-[#f3f3f3] text-[#049c63]'
                  : 'bg-[#049c63] text-[#f3f3f3]'
              } border-[#f3f3f3] border-2 rounded-[8px] py-2 px-5 my-3 mx-auto w-10/12 text-center cursor-pointer`}>
              BM
            </button>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-[#ebebeb] w-4/5 h-full flex flex-col pt-[100px] pb-[70px] overflow-y-scroll justify-between">
        <div className="w-[800px] flex flex-col gap-10 mx-auto">
          {/* Message Section */}
          {data.messages.map((message: null | undefined, index) => (
            <div
              className={`flex flex-row ${
                index % 2 == 0 ? 'justify-end' : 'justify-start'
              }`}>
              <div
                className={`${
                  index % 2 == 0 ? 'bg-[#22bf30]' : 'bg-[#fefefe]'
                } w-fit h-fit px-[18px] py-[12px] rounded-[8px] max-w-[600px] whitespace-normal overflow-hidden`}>
                {message}
              </div>
            </div>
          ))}
        </div>
        {/* Input Section */}
        <form
          className="w-[800px] h-[48px] mx-auto mt-[50px]"
          action=""
          onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="Ask a question ..."
            className="bg-[#fefefe] w-full h-full text-black border-0 border-transparent ring-0 focus:border-transparent focus:ring-0"
          />
        </form>
      </div>
    </div>

    // <div className="bg-[#fefefe] h-auto relative">
    //   <div className="flex">
    //     {/* sidebar hit box */}
    //     <div className="h-screen w-[400px]"></div>
    //     <div className="w-1/4 h-screen fixed">
    //       <div className="bg-[#2E4F4F] h-[80%] font-[Montserrat-Medium] text-white text-[28px] pt-[30px]">
    //         <div
    //           className="h-fit flex justify-center pb-[40px]"
    //           style={{
    //             filter: 'drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.25))',
    //           }}>
    //           History
    //         </div>
    //         <div className="h-4/5 mt-[-10px]">
    //           {history.map(item => (
    //             <div
    //               key={item.id}
    //               className="h-[20%] bg-[#608C8C] mx-[40px] mb-[5%] rounded-[20px] text-[15px] px-[20px] flex items-center"
    //               style={{
    //                 filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //               }}>
    //               {item.message}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="h-[0.5%]"></div>
    //       <div className="bg-[#2E4F4F] h-[29.5%] font-[Montserrat-Medium] text-white text-[50px] pt-[10px]">
    //         <span
    //           className="flex justify-center"
    //           style={{
    //             filter: 'drop-shadow(0px 5px 1px rgba(0, 0, 0, 0.25))',
    //           }}>
    //           Algorithm
    //         </span>
    //         <div className="pl-[60px]">
    //           <div className="flex mt-[20px]">
    //             <input
    //               type="radio"
    //               className="form-radio"
    //               name="algorithm"
    //               value="KMP"
    //             />
    //             <div
    //               className="pl-2 text-[20px] mt-[-7px]"
    //               style={{
    //                 filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //               }}>
    //               Knuth-Morris-Prat
    //             </div>
    //           </div>
    //           <div className="flex mt-[20px]">
    //             <input
    //               type="radio"
    //               className="form-radio"
    //               name="algorithm"
    //               value="BM"
    //             />
    //             <div
    //               className="pl-2 text-[20px] mt-[-7px]"
    //               style={{
    //                 filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //               }}>
    //               BM
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-3/4 relative">
    //       <div className="messages-container h-auto mt-[50px] mb-[100px] right-0">
    //         {messages.map((message, index) => (
    //           <div>
    //             <div className="text-right">
    //               <div
    //                 key={index}
    //                 className="inline-block bg-[#569DAA] py-2 px-[25px] rounded-[20px] my-[10px] mx-[50px]"
    //                 style={{
    //                   filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //                 }}>
    //                 {message}
    //               </div>
    //             </div>
    //             <div className="block">
    //               <div className="flex items-center">
    //                 <img
    //                   src={profile.src}
    //                   className="w-[30px] h-[30px] ml-[20px]"
    //                 />
    //                 <div
    //                   key={index}
    //                   className="inline-block bg-[#608C8C] py-2 px-[25px] rounded-[20px] my-[10px] ml-[25px] mr-[50px]"
    //                   style={{
    //                     filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //                   }}>
    //                   iya sumpah gangerti lagi gua anjg
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //       <form
    //         onSubmit={handleSubmit}
    //         className="input-container fixed bottom-0 right-0 w-3/4">
    //         <div className="flex">
    //           <input
    //             type="text"
    //             value={inputText}
    //             onChange={handleInput}
    //             placeholder="Insert your question here..."
    //             className="w-full py-2 pl-[25px] rounded-[20px] my-[20px] ml-[40px] bg-[#2E4F4F] text-white"
    //             style={{
    //               filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //             }}
    //           />
    //           <button
    //             type="submit"
    //             className="w-[8%] bg-[#2E4F4F] text-white px-4 py-2 my-[20px] mx-[30px] rounded-[20px]"
    //             style={{
    //               filter: 'drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.25))',
    //             }}>
    //             &gt;
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
