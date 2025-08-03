// Nếu bạn dùng React + Tailwind CSS:
import React, { useState } from 'react';

export default function AddEpisodeForm() {
    const [title, setTitle] = useState('');
    const [episodeNumber, setEpisodeNumber] = useState('');
    const [linkVideo, setLinkVideo] = useState('');
    const [releaseOption, setReleaseOption] = useState('now'); // 'now' | 'schedule'
    const [releaseTime, setReleaseTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            episodeNumber,
            linkVideo,
            releaseOption,
            releaseTime: releaseOption === 'schedule' ? releaseTime : new Date().toISOString()
        };
        console.log('Submit Episode:', payload);
        // POST API hoặc xử lý tiếp tại đây
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Tạo Tập Phim Mới</h2>

            <label className="block mb-2">Tên tập phim</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="..."

            />


            <label className="block mb-2">Link video (YouTube)</label>
            <input
                type="text"
                value={linkVideo}
                onChange={(e) => setLinkVideo(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="....."
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

            <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
                Create
            </button>
        </form>
    );
}
