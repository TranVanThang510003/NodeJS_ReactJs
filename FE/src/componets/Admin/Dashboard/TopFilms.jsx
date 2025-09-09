
const topFilms = [
  {
    id: 1,
    title: "Avengers: Endgame",
    revenue: 2797800564,
  },
  {
    id: 2,
    title: "Avatar",
    revenue: 2847246203,
  },
  {
    id: 3,
    title: "Titanic",
    revenue: 2187463944,
  },
  {
    id: 4,
    title: "Star Wars",
    revenue: 2068223624,
  },
  {
    id: 5,
    title: "Jurassic World",
    revenue: 1671713208,
  },

];

const TopFilms=()=>{

  return(
    <div className="w-full flex flex-col  ">
         <div className="tex-3xl font-bold text-gray-600">
           Top Films
         </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="px-4 py-2">no.</th>
            <th className="px-8 py-2">Name</th>
            <th className="px-4 py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
        {topFilms.map((topFilm,index)=>(
          <tr key={topFilm.id} className='border-b border-gray-400'>
            <td>{index + 1}</td>
            <td>{topFilm.title}</td>
            <td className="px-4 py-2  text-green-600 font-semibold">
              {topFilm.revenue.toLocaleString("en-US")}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
export default TopFilms;