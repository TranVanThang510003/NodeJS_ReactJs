import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createEpisodeApi } from '../../../util/api.js'

export default function AddEpisodeForm () {
  const { movieId } = useParams()
  const [title, setTitle] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [releaseOption, setReleaseOption] = useState('now')
  const [releaseTime, setReleaseTime] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      movieId,
      title,
      episodeNumber: Number(episodeNumber),
      videoUrl: linkVideo,
      isPremium,
      releaseTime: releaseOption === 'schedule' ? releaseTime : new Date().toISOString()
    }

    try {
      const res = await createEpisodeApi(movieId, payload)
      console.log('Tạo thành công:', res.data)

      setMessage('✅ Tạo tập phim thành công!')
      setMessageType('success')

      // Reset form
      setTitle('')
      setEpisodeNumber('')
      setLinkVideo('')
      setReleaseOption('now')
      setReleaseTime('')
      setIsPremium(false)
    } catch (err) {
      console.error('Lỗi khi tạo tập:', err.response || err)
      setMessage('❌ Tạo tập phim thất bại. Vui lòng thử lại!')
      setMessageType('error')
    }

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Tạo Tập Phim Mới</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <label className="block mb-2">Tên tập phim</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="..."
        required
      />

      <label className="block mb-2">Số tập</label>
      <input
        type="number"
        value={episodeNumber}
        onChange={(e) => setEpisodeNumber(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="1"
        required
      />

      <label className="block mb-2">Link video (YouTube)</label>
      <input
        type="text"
        value={linkVideo}
        onChange={(e) => setLinkVideo(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="https://"
        required
      />

      <label className="block mb-2">Thời gian phát hành</label>
      <div className="flex items-center gap-4 mb-4">
        <label>
          <input
            type="radio"
            value="now"
            checked={releaseOption === 'now'}
            onChange={() => setReleaseOption('now')}
          />{' '}
          Phát hành ngay
        </label>
        <label>
          <input
            type="radio"
            value="schedule"
            checked={releaseOption === 'schedule'}
            onChange={() => setReleaseOption('schedule')}
          />{' '}
          Đặt lịch
        </label>
      </div>

      {releaseOption === 'schedule' && (
        <input
          type="datetime-local"
          value={releaseTime}
          onChange={(e) => setReleaseTime(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
      )}

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isPremium"
          checked={isPremium}
          onChange={() => setIsPremium(!isPremium)}
          className="mr-2"
        />
        <label htmlFor="isPremium">Tập phim này yêu cầu tài khoản Premium</label>
      </div>

      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
      >
        Tạo tập
      </button>
    </form>
  )
}
