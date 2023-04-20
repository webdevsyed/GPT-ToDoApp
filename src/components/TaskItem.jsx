const TaskItem = ({ task }) => {
    return (
        <>
        <div className=" flex justify-between rounded-lg py-4 my-1">
            <p className="pl-1 font-semibold text-md">{task.TaskName} </p>
            <p className="text-sm sm:text-base ">{task.DueDate ? "" + task.DueDate : ""}</p>
        </div>
        <hr className="border-0 h-[0.5px] dark:bg-gray-400"/>
        </>
    )
}

export default TaskItem
