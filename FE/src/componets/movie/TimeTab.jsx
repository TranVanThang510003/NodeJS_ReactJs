import React from 'react';

const TimeTabs = () => {
    return (
        <div className=" w-full mb-4 mt-2">
            <div className="flex space-x-2 justify-between  w-full ">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <button
                        key={day}
                        className="px-3 py-2 w-full bg-gray-600 rounded-md text-white hover:bg-[#ff6500]"
                    >
                        {day}
                    </button>
                ))}
            </div>
            {/*<div className="text-right">*/}
            {/*    <span>Hôm Nay Xem Gì?</span>*/}
            {/*    <p className="text-sm text-green-400">*/}
            {/*        Nêu bạn buôn hãy cùng bạn xem gi hôm nay. Hãy để chúng tôi chọn cho bạn*/}
            {/*    </p>*/}
            {/*    <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded">*/}
            {/*        Xem Anime Ngẫu Nhiên*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default TimeTabs;