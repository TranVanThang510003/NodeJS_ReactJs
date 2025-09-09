
const MetricCard = ({data,icon})=>{

  return(
    <div className='flex w-[250px] h-[150px] bg-white shadow rounded-lg p-4 '>
      <div className="w-3/4 flex flex-col items-center justify-center">
         <div className="text-xl font-semibold text-gray-800">{data.title}</div>
         <div className="text-lg text-gray-800">{data.metric}</div>
      </div>
      <div className=' w-1/4 flex items-center justify-center'>
        <div className="">{icon}</div>
      </div>
    </div>
  )
}
export default MetricCard;