import CreateMovieForm from '../../componets/Admin/MovieManagement/CreateMovieForm.js'

const CreateMoviePage=()=> {
      return(
      <div className="flex flex-col gap-6   min-h-screen">
        <div className="text-3xl font-semibold text-gray-800 ">
          Create Movie
        </div>
        <CreateMovieForm/>
      </div>
      )
}
export default CreateMoviePage