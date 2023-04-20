import { recreateObjectsFromArrays } from '../utils/helper';
import TaskItem from './TaskItem';

const TaskList = ({tasksArray}) => {
 
  return (
    <div >
    <h2 className='text-2xl font-bold text-blue-500 mb-1 pl-1'>All Tasks</h2>
    <hr className='w-32 border-0 h-[0.5px] dark:bg-gray-400'/>
    {/* <div className=''> */}
      {recreateObjectsFromArrays(tasksArray).map((task, index) => {
        return <TaskItem key={index} task={task}/>

      })}
    {/* </div> */}
    
  </div>
  )
}

export default TaskList
