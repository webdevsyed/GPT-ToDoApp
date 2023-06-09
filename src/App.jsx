import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { Spinner } from "flowbite-react";
import TaskList from './components/TaskList';
import Header from './components/Header';
import Conversation from './components/Conversation';
import getReplyFromAi from './utils/getReplyFromAi';
import { parseModOutput, reorderArray,addHeader } from './utils/helper';
import { initialPromptArray } from './assets/prompts';
import sendIcon from './assets/sendIcon.png';

function App() {

  const [prompt, setPrompt] = useState("")
  const [tasksArray, setTasksArray] = useState(
    [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"]]
  )
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConverstaion] = useState([])

  //Configuring OpenAI API
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //Retrieving existing task list from local storage
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      let tasks = addHeader(JSON.parse(localStorage.getItem("tasks")))
      console.log(tasks)
      setTasksArray(tasks)
    }
    else {
      localStorage.setItem("tasks", JSON.stringify(tasksArray))
    }
  }, [])

  const handleSubmit = (event, newPrompt) => {
    event.preventDefault();
    setConverstaion(prevConversation => {
      let newConversation = [...prevConversation, { role: "user", content: `${newPrompt}` }]
      chatAI(newConversation)
      return newConversation
    })
    setIsLoading(true)
    setPrompt("");
  }

  const chatAI = async (newConversation) => {
    // Recieve new prompt from user, and append it to the training prompt
    const updatedTasksObj = {
      role: "user", content: `Forget the exisitng task list and replace it with this list: 
    ${JSON.stringify(tasksArray)}`
    }

    const updatedPromptArray = [...initialPromptArray, updatedTasksObj, ...newConversation]

    const replyMessage = await getReplyFromAi(updatedPromptArray, openai)
    console.log(replyMessage.content)

    // if the reply contains MODIFIED ARRAY
    // parse it to get the text reply and the array
    if ((replyMessage.content).includes("MODIFIED ARRAY") || (replyMessage.content).includes("[[")) {

      const [textStr, array] = parseModOutput(replyMessage.content)

      let reorderedArray = reorderArray(array)
      console.log(reorderedArray)
      setTasksArray(reorderedArray)
      localStorage.setItem("tasks", JSON.stringify(reorderedArray))

      //if the prompt contains CLEARHISTORYNOW conversation is cleared,
      //else the latest reply is appended to the convrsation
      if ((replyMessage.content).includes("CLEARHISTORYNOW")) {
        setConverstaion([{ role: "assistant", content: textStr }])
      }
      else {
        setConverstaion(prevConversation => {
          return (
            [...prevConversation, { role: "assistant", content: textStr }]
          )
        })
      }
    }
    else {
      // console.log("Reply does NOT contain 'MODIFIED ARRAY'")
      try {
        // This part is error prone as replies from OpenAi can change and may not match parsing function
        // const textStr = parseModOutput1(replyMessage.content)
        const textStr = replyMessage.content
        if ((replyMessage.content).includes("CLEARHISTORYNOW")) {
          setConverstaion([{ role: "assistant", content: textStr }])
        }

        else {
          setConverstaion(prevConversation => {
            return (
              [...prevConversation, { role: "assistant", content: textStr }]
            )
          })
        }

      } catch (error) {
        console.log(error)
        //TODO Add pop up when this error occurs to tell the user to try again
        //refresh the browser or reset conversation state to empty  
      }
    }
    setIsLoading(false)
  }


  return (
    <div className='min-h-screen w-full dark:bg-[#242424] dark:text-white overflow-x-hidden'>
      <Header />
      <div className="pt-10 max-w-5xl mx-auto flex-col px-3 lg:pr-6">
        <Conversation conversation={conversation} />

        {isLoading ? <div className='text-center'><Spinner aria-label="Loading" size="lg" /></div> : ""}

        <form
          onSubmit={(event) => handleSubmit(event, prompt)}
          className='mt-3'
        >
          <input
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className={` relative dark:text-black w-full h-14 rounded-md px-3 border-2 pr-9 `}
            placeholder='Start chatting here...'
            disabled={isLoading ? true : false}
          />
          <img src={sendIcon} onClick={(event) => { handleSubmit(event, prompt) }} className=' cursor-pointer relative left-[89%] sm:left-[92%] md:left-[95.5%] -top-[43px] w-8'></img>
          <input
            type="submit"
            hidden
            hidefocus="true"
          />
        </form>

        {/*
         <textarea
          className='w-full h-10 text-xl p-2 mt-2 dark:text-black'
          // id="prompt"
          placeholder='Enter Task Here..'
          type="text"
          onChange={(event) => setPrompt(event.target.value)}>
        </textarea>
        <div>
          <button
            style={{ backgroundColor: "darkgray", color: "white", margin: "1rem" }}
            onClick={() => handleSubmit(prompt)}>
            Submit
          </button>
        </div> 
        */}

        <TaskList tasksArray={tasksArray} />

      </div>
    </div>
  )
}
export default App



