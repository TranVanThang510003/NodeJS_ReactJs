import React from 'react';

const EpisodeList = ({ episodes }) => {
    // Default episodes array if none provided
    const episodeNumbers = episodes || Array.from({ length: 99 }, (_, i) => i + 1);

    return (
        <div className="bg-gray-900 p-4 rounded-lg">
            <div className="grid grid-cols-10 gap-2">
                {episodeNumbers.map((episode) => (
                    <div
                        key={episode}
                        className="bg-gray-800 text-white text-center py-2 rounded hover:bg-orange-500 cursor-pointer"
                    >
                        {episode}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;