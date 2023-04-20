const Conversation = ({ conversation }) => {
    return (
        <div className="min-h-[20vh] mb-10">

            <div className="flex items-center my-4 dark:text-white">
                <p className="text-sm text-center flex items-center justify-center bg-blue-300 dark:bg-blue-600 w-12 min-w-[3rem] h-12 mx-3 rounded-full font-bold ">AI</p>
                <p className="flex bg-blue-300 dark:bg-blue-600 w-full lg:w-8/12 px-5 py-3 mx-3 rounded-md font-semibold">Hi! What tasks do you have?</p>
            </div>
            {conversation.map((reply, index) => {
                return (
                    <div key={index} 
                         className={`flex items-center my-5 dark:text-white ${reply.role == "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <p className={`text-sm text-center flex items-center justify-center  w-12 min-w-[3rem] h-12 mx-3 rounded-full font-bold ${reply.role == "user" ? "bg-purple-300 dark:bg-purple-600" : "bg-blue-300 dark:bg-blue-600"} `}>{reply.role == "user" ? "YOU" : "AI"}</p>
                        <p className={`flex w-full lg:w-8/12 px-5 py-3 mx-3 rounded-md whitespace-pre-wrap break-words font-semibold ${reply.role == "user" ?  "bg-purple-300 dark:bg-purple-600" : "bg-blue-300 dark:bg-blue-600"}`}>{reply.content}</p>
                    </div>

                )
            })}
        </div>

    )
}

export default Conversation
