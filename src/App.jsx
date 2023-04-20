import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { Progress } from "flowbite-react";
import TaskList from './components/TaskList';
import Header from './components/Header';
import Conversation from './components/Conversation';
import getReplyFromAi from './utils/getReplyFromAi';
import { parseModOutput } from './utils/helper';
import { initialPromptArray } from './assets/prompts';
import sendIcon from './assets/sendIcon.png';

function App() {

  const [prompt, setPrompt] = useState("")
  const [tasksArray, setTasksArray] = useState(
    [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"]]
  )
  const [isLoading, setIsLoading] = useState(0)
  const [conversation, setConverstaion] = useState([])

  //Configuring OpenAI API
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //Retrieving existing task list from local storage
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasksArray(JSON.parse(localStorage.getItem("tasks")))
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
    setIsLoading(5)
    setPrompt("");
  }


  const chatAI = async (newConversation) => {
    // Recieve new prompt from user, and append it to the training prompt
    const updatedTasksObj = {
      role: "user", content: `Forget the exisitng task list and replace it with this list: 
    ${JSON.stringify(tasksArray)}`
    }

    const updatedPromptArray = [...initialPromptArray, updatedTasksObj, ...newConversation]

    setIsLoading(20)

    const replyMessage = await getReplyFromAi(updatedPromptArray, openai)

    setIsLoading(65)

    // if the reply contains MODIFIED ARRAY
    // parse it to get the text reply and the array
    if ((replyMessage.content).includes("MODIFIED ARRAY") || (replyMessage.content).includes("Here's your updated task list:")) {

      const [textStr, array] = parseModOutput(replyMessage.content)

      setTasksArray(array)
      localStorage.setItem("tasks", JSON.stringify(array))

      setIsLoading(100)

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
        const textStr = parseModOutput(replyMessage.content)
        setIsLoading(100)
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
    setIsLoading(0)
  }


  return (
    <div className='min-h-screen min-w-[465px] dark:bg-[#242424] dark:text-white '>
      <Header />
      <div className="pt-10 max-w-5xl mx-auto flex-col px-3">
        <Conversation conversation={conversation} />

        {isLoading == 0
          ? ""
          : <Progress
            progress={parseInt(isLoading)}
            size="sm"
          />}

        <form
          onSubmit={(event) => handleSubmit(event, prompt)}
          className=''
        >
          <input
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className={` relative dark:text-black w-full h-14 rounded-md px-3 border-2 `}
            placeholder='Start chatting here...'
          />
          <img src={sendIcon} className='relative left-[93%] md:left-[95.5%] -top-[43px] w-8'></img>
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



