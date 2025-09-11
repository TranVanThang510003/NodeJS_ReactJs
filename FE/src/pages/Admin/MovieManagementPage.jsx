import MovieTable from '../../componets/Admin/MovieManagement/MovieTable.jsx'
import { useNavigate } from 'react-router-dom'
const MovieManagementPage =() => {
  const navigate = useNavigate();
  const handleAddNew=()=>{
    navigate("/admin/movies/create-movie");
  }
    return (
    <div className="flex flex-col gap-6   min-h-screen">
      <div className="w-full flex justify-between ">
        <div className="text-3xl font-semibold text-gray-800 ">
          MANAGE MOVIES
        </div>
        <button className="text-lg font-semibold text-white rounded-lg bg-blue-400 px-4 py-2" onClick={handleAddNew}>Add
          new
        </button>
      </div>
      <div className="w-full flex justify-center  ">
        <MovieTable/>
      </div>
    </div>
  )
}
export default MovieManagementPage;