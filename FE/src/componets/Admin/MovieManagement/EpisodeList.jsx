import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CreateEpisode from './AddEpisodeForm.tsx'
import { getEpisodeByMovieId } from '../../../util/api.ts'

const EpisodeList = () => {
  const { movieId } = useParams()
  console.log(movieId)
  const navigate = useNavigate()
  const [episodes, setEpisodes] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await getEpisodeByMovieId(movieId)
        setEpisodes(res.data.episodes || [])
        console.log(res)
      } catch (error) {
        console.error('Lỗi khi lấy tập phim:', error)
      }
    }

    fetchEpisodes()
  }, [movieId])

  const handleEdit = (episodeId) => {
    navigate(`/dashboard/movies/${movieId}/episodes/edit/${episodeId}`)
  }

  const handleDelete = async (episodeId) => {
    const confirmed = window.confirm('Bạn có chắc muốn xoá tập phim này?')
    if (!confirmed) return

    try {
      await axios.delete(`/api/episodes/${episodeId}`)
      setEpisodes((prev) => prev.filter((ep) => ep.id !== episodeId))
    } catch (error) {
      console.error('Lỗi khi xoá:', error)
    }
  }

  const handleAdd = () => setShowForm(true)
  const handleCloseForm = () => setShowForm(false)
  const getStatus = (releaseTime) => {
    const now = new Date() // Lấy thời gian hiện tại thực tế
    const release = new Date(releaseTime)
    return release <= now ? 'Đã phát hành' : 'Chưa phát hành'
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Danh sách tập phim</h1>
          <button
            onClick={handleAdd}
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md transition"
          >
            + Thêm tập phim
          </button>
        </div>

        {/* Form thêm tập phim */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
              <button
                onClick={handleCloseForm}
                className="absolute top-2 right-2 text-gray-500 hover:text-black p-2 text-3xl"
              >
                ×
              </button>
              <CreateEpisode movieId={movieId} onClose={handleCloseForm}/>
            </div>
          </div>
        )}

        {/* Danh sách tập phim */}
        {episodes.length === 0 ? (
          <p className="text-gray-400 text-center">Chưa có tập phim nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-200">
            {episodes.map((ep) => (
              <div
                key={ep._id}
                className="bg-[#1c1c1e] border border-gray-700 rounded-xl p-5 hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <h2 className="text-xl font-semibold mb-2">{ep.title}</h2>
                <p className="text-gray-400 mb-1">
                  <span className="text-gray-300 font-medium">Ngày phát hành:</span> {ep.releaseDate}
                </p>
                <p className="mb-3">
                 <span
                   className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                     getStatus(ep.releaseTime) === 'Đã phát hành'
                       ? 'bg-green-700/30 text-green-300'
                       : 'bg-yellow-700/30 text-yellow-300'
                   }`}
                 >
                                        {getStatus(ep.releaseTime)}
                                    </span>
                </p>
                <p className="mb-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        ep.isPremium
                          ? 'bg-red-700/30 text-red-300'
                          : 'bg-blue-700/30 text-blue-300'
                      }`}
                    >
                        {ep.isPremium ? 'Premium' : 'Free'}
                    </span>
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(ep.id)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(ep.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EpisodeList
