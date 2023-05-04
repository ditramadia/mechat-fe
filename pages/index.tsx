import React, { useState, useEffect, useRef } from 'react'

// import conversations from './conversation.JSON'

const conversations: Array<{ id: number, messages: string[] }> = [
  {
    id: 0,
    messages: []
  }
]

const Home = () => {
  const [isKMP, setIsKMP] = useState(true)
  const [inputText, setInputText] = useState('')
  // const [conversations, setConversations] = useState(conversations)
  const [data, setData] = useState(conversations[conversations.length - 1])
  const [scrollButton, setScrollButton] = useState(false)
  const [newChat, setNewChat] = useState(false)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const fetchResponse = async () => {
    const reqBody = {
      expr: inputText,
      alg: isKMP ? 'KMP' : 'BM'
    }
    const responseData = await fetch('https://mechat.up.railway.app/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    const dataServer = await responseData.json()
    data.messages.push(dataServer.result)
  }

  useEffect(() => {
    if (scrollButton) {
      scrollToBottom()
      setScrollButton(false)
    }
  }, [scrollButton])

  useEffect(() => {
    setNewChat(false)
  }, [newChat])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText((event.target as HTMLInputElement).value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    data.messages.push(inputText)
    try {
      await fetchResponse()
    } catch (error) {
    }
    setInputText('')
    setScrollButton(true)
  }

  const handleNewChat = () => {
    setNewChat(true)
    conversations.push({
      id: conversations.length,
      messages: []
    })
    setData(conversations[conversations.length - 1])
  }

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }

  //   const deleteConversation = (id: number) => {
  //     if (conversations.length > 1) {
  //       const newConversations = conversations.filter((conversation, idx) => idx !== id)
  //       setConversations(newConversations)
  //       if (id == 0) {
  //         setData(conversations[0])
  //       } else {
  //         setData(conversations[id - 1])
  //       }
  //     }
  //   }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className="bg-[#049c63] w-1/5 h-full flex flex-col justify-between"
        style={{
          filter: 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.5))'
        }}>
        {/* History */}
        <div className="w-full h-[400px] flex-col py-[20px] overflow-hidden">
          <h2 className="text-white font-[Montserrat-Bold] text-[24px] text-center">
            History
          </h2>
          <div className="history-container w-full h-[320px] mt-5 flex-col overflow-y-scroll">
            {conversations.map((conversation: { id: React.Key, messages: string[] }, index: number) => (
              <div key={index} className={`${
                data.id === index
                  ? 'border-[#f3f3f3] bg-[#f3f3f3] text-[#049c63]'
                  : 'border-[#049c63] bg-[#049c63] text-[#f3f3f3]'
              } h-[38px] overflow-hidden rounded-[8px] my-3 mx-auto w-10/12 cursor-default ml-7 hover:bg-[#f3f3f3] hover:text-[#049c63] relative group`}>
                <button className='rounded-[8px] w-full h-full text-left py-2 px-5'
                  onClick={() => {
                    setData(conversations[parseInt(conversation.id.toString())])
                    console.log(conversation.id, data.id)
                  }}
                  key={conversation.id}>
                  {conversation.messages.length === 0
                    ? 'New chat'
                    : conversation.messages[0]}
                </button>
                <button onClick={() => {
                }} className={`${data.id === index ? 'block' : 'hidden'} absolute right-4 top-[7px] group-hover:block`}>
                  ✕
                </button>
              </div>
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
              Boyer-Moore
            </button>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <div ref={chatBoxRef} className="bg-[#ebebeb] w-4/5 h-full flex flex-col pt-[94px] pb-[100px] px-[400px] overflow-y-scroll justify-between relative">
        {/* Message Section */}
        <div className="max-w-[700px] w-full min-w-[600px] flex flex-col gap-10 mx-auto">
          {data.messages.map((message, index) => (
            <div key={index}
              className={`flex flex-row w-full ${
                index % 2 === 0 ? 'justify-end' : 'justify-start'
              }`}>
              <div
                className={`${
                  index % 2 === 0 ? 'bg-[#22bf30]' : 'bg-[#fefefe]'
                } w-fit h-fit px-[18px] py-[12px] rounded-[8px] max-w-[600px] whitespace-normal overflow-hidden`}>
                {message}
              </div>
            </div>
          ))}
        </div>
        {/* Input Section */}
        <form
          className="max-w-[710px] w-full min-w-[600px] h-[48px] mx-auto mt-[50px] fixed bottom-20"
          action=""
          onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="Ask a question ..."
            className="bg-[#fefefe] w-full h-[48px] text-black border-0 border-transparent ring-0 focus:border-transparent focus:ring-0"
            style={{
              filter: 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.2))'
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default Home
