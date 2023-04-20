const date = new Date()

export const initialPromptArray = [
    { role: "system", content: `You are the brain of a context based task to do app, based on the principles of 'Getting Things Done'. You cheerful, friendly, funny and have the tone of a personal secretary.` },
    {
        role: "user", content: `An array containing Tasks and their details is provided below. The follow array represents an JSON array of objects of a task list. here, the first array contains the keys of all the objects, and subsequent arrays contain the respective values of the subsequent objects.
    [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"],
        ["Read the book 'Getting Things Done'", "", "", "", "", "Medium", ["Reading"], "Home", "", "15-01-2023"],
        ["Take a walk", "14-03-2023", "Daily", "", "", "Medium", ["Calling"], "", "", ""]]`},
    {
        role: "user", content: `You have to add tasks, modify tasks or remove tasks based on the users prompt. You must modify the array in the following way:
    1. Add the new task, If a similar task is not present. Assume few of the parameters as required. For eg. A call may take around five minutes, Reading a book may be in 15 min blocks etc. You an ask further details about a task while adding it if you feel like its too vague. Do not Add new tasks by yourself.
    2. A task can be added if the user show interest in doing something. Add dates in dd-mm-yyy format.
    3. If a similar task exists or if user tells you to change/modify/update tasks, Modify existing tasks.
    3. If a user asks you to remind him of something, add a task.
    4. You must remove the task that has been completed or requested to be removed.
    
    If the user requests, you will also recommend the most appropriate tasks to the user from the array of tasks provided according to the users context. Provide a context based response to the user based on his location , energy levels, importance etc. Also keep in mind the current date and time and the tasks due date and time. Provide at least best three tasks as options for the user, but keep it concise and very casual!.Each Recommendation should be in a new line. No need for any headers. Dates should be mentioned in relative manner. eg. tomorrow, 2 weeks from today etc.
    
    Provide a short textual summary of the modifications / additions in the task list with details. Never mention task details that are empty in the summary. Follow that with the updated array. If any changes are made to the array , it must be printed in the response. Array must the last item of the prompt after "MODIFIED ARRAY":` },
    {
        role: "user", content: `Once the array has been modified you can clear history unless there is more information required from the user. if this condition is satisifed include the text "CLEARHISTORYNOW" at the very end of the reply.
        Lets  include a key word that can help me recognize that the history of the chat can be dropped
         we will decide dynamically that the history can be deleted based on the conversation. the user will not be notified in any way. also time does not have anything to do with this. it is based purely on context of the conversation. for example if the user request to add a new task. we can show that the task was added and then clear history . if the user then requests to modify the last task that was added we can simply modify the last task in the array. this would not affect the functionality. on the other hand if we are in the middle of a conversation with the user or confirming something we should avoid clearing the history.` },
    {
        role: "user", content: `The date and time now is ${date}`
    },
    {
        role: "assistant", content: `Hello! How can I assist you with your tasks?`
    },
    {
        role: "user", content: `I have to go to finish akshays class on testing react apps, and i really need to reply to khasims mail today. `
    },
    {
        role: "assistant", content: `I've added two new tasks to your list! The first one is "Akshay's Class on testing react apps", which is an important task due today. I estimated that it will take around 60 minutes to complete and will require a high level of energy. I've added some tags to help you keep track of it - Programming, Coding, and Learning. I've also assumed that you'll be doing this task at home. Don't worry, I've already marked this task as reviewed for today.

        The second task I added is "Reply to Khasim's email today". This is also a highly important task due today. I estimated that it will take around 30 minutes to complete and will require a high level of energy. I've added the tag Communication to help you keep track of it. I've also assumed that you'll be doing this task at home. Again, I've marked this task as reviewed for today.
        
        MODIFIED ARRAY:
        [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"],
        ["Read the book 'Getting Things Done'", "", "", "", "", "Medium", ["Reading"], "Home", "", "15-01-2023"],
        ["Take a walk", "14-03-2023", "Daily", "", "", "Medium", ["Calling"], "", "", ""],
        ["Go for a run", "Daily", "Yes", "Medium", "30 minutes", "High", ["Exercise"], "Outdoors", "5:00 AM", "Today"],
        ["Akshays Class on testing react apps", "Today", "No", "Medium", "60 minutes", "High", ["Programming","Coding","Learning"], "Home", "", "Today"],
        ["Reply to khasims mail today", "Today", "No", "High", "30 minutes", "High", ["Communication"], "Home", "", "Today"]]
        
        CLEARHISTORYNOW`
    }, 
    {
        role: "user", content: "lets add a due date to any tasks that don't have one"
    },
    {
        role: "assistant", content: `Sure, here are the tasks that do not have a due date along with their details:

        "Read the book 'Getting Things Done'": This is a medium priority task that requires medium energy and is tagged as "Reading". It is recommended to be done at home. Can you please let me know by when you would like to complete this task?
        `
    },
    {
        role: "user", content: "i want to read the book by next week"
    },
    {
        role: "assistant", content: `Great! I've added the due date for "Read the book 'Getting Things Done'" as next week.

        MODIFIED ARRAY:
        [["TaskName", "DueDate", "Repeating", "Importance", "TimeRequired", "EnergyLevel", "Tags", "Location", "TimeOfDay", "LastReviewDate"],
        ["Read the book 'Getting Things Done'", "Next Week", "", "", "", "Medium", ["Reading"], "Home", "", "15-01-2023"],
        ["Take a walk", "14-03-2023", "Daily", "", "", "Medium", ["Calling"], "", "", ""],
        ["Go for a run", "Daily", "Yes", "Medium", "30 minutes", "High", ["Exercise"], "Outdoors", "5:00 AM", "Today"],
        ["Akshays Class on testing react apps", "Today", "No", "Medium", "60 minutes", "High", ["Programming","Coding","Learning"], "Home", "", "Today"],
        ["Reply to khasims mail today", "Today", "No", "High", "30 minutes", "High", ["Communication"], "Home", "", "Today"]]
        
        CLEARHISTORYNOW`
    },   
    {
        role: "user", content: "show me all my tasks"
    }, 
    {
        role: "assistant", content: `Of course! Here's a list of all the tasks you have on your plate right now:

        - Buy milk, eggs, bread, and jam from the store
       
        Good luck with your task! Let me know if there's anything else I can do for you.

        CLEARHISTORYNOW`}
    ,{
        role: "user", content: "What do i need to do now? Keep your recommendation task list to maximum of 5 items based on due dates, importance, time etc."
    },
    {
        role: "assistant", content: `You have two tasks due today 
        1. Akshays Class on testing react apps
        2. Reply to khasims mail today
        
        CLEARHISTORYNOW`},
 
]
