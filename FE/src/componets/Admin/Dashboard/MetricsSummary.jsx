import MetricCard from './MetricCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDollarSign, faBox, faEye } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  User: (
    <FontAwesomeIcon
      icon={faUser}
      className="text-[28px] text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]"
    />
  ),
  Revenue: (
    <FontAwesomeIcon
      icon={faDollarSign}
      className="text-[28px] text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]"
    />
  ),
  Views: (
    <FontAwesomeIcon
      icon={faEye}
      className="text-[28px] text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.7)]"
    />
  ),
  Films: (
    <FontAwesomeIcon
      icon={faBox}
      className="text-[28px] text-purple-500 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]"
    />
  ),
};

// Map label hiển thị theo title gốc từ API
const labelMap = {
  User: "Total Users",
  Revenue: "Monthly Revenue",
  Views: "Monthly Views",
  Films: "Total Films",
};

const data=[
  {
    title:'User',
    metric:19,
  },
  {
    title: 'Revenue',
    metric:12,
  },
  {
    title: 'Views',
    metric:120000,
  },
  {
    title: 'Films',
    metric:12,
  }
]
const MetricsSummary = ()=>{

  return(
    <div className='flex justify-between'>
      {data.map((item,index)=>(
      <MetricCard key={index}
        data={{
        title: labelMap[item.title] || item.title,
        metric: item.metric }}
        icon={iconMap[item.title]}  />))}
    </div>
  )
}
export default MetricsSummary;