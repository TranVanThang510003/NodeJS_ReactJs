import RevenueChart from '../../componets/Admin/Dashboard/RevenueChart.jsx'
import MetricsSummary from '../../componets/Admin/Dashboard/MetricsSummary.jsx'
// import ViewChart from '../../componets/Admin/Dashboard/ViewChart.jsx'
import TopFilms from '../../componets/Admin/Dashboard/TopFilms.jsx'

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tiêu đề */}
      <div className="text-2xl font-bold">DASHBOARD</div>

      {/* Các thẻ Metrics */}
      <MetricsSummary/>
      {/* Chart RevenueChart chiếm hết ngang */}
      <div className="w-full flex gap-4">
        <div className="w-1/3 bg-white p-8  shadow rounded">
          <TopFilms/>
        </div>
        <div className="w-2/3 bg-white p-4 rounded shadow flex justify-center">
          <RevenueChart/>
        </div>
      </div>
      {/*<div className="w-full bg-white  rounded shadow flex justify-center p-10">*/}
      {/*    <ViewChart/>*/}
      {/*</div>*/}


    </div>
  )
}

export default Dashboard
