import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Filters {
    genre: string;
    country: string;
    year: string;
}

interface FilterBarProps {
    setIsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    onFilterChange?: (filters: Filters) => void;
}

const genres = [
    { label: "🐉 Tu Tiên", value: "Tu Tiên" },
    { label: "👻 Dị Giới", value: "Dị Giới" },
    { label: "🌀 Chuyển Sinh", value: "Chuyển Sinh" },
    { label: "👽 Viễn Tưởng", value: "Viễn Tưởng" },
    { label: "🔫 Hành Động", value: "Hành Động" },
    { label: "🧑‍🤝‍🧑 Tình Yêu", value: "Tình Yêu" },
    { label: "🏫 Học Đường", value: "Học Đường" },
    { label: "😈 Kinh Dị", value: "Kinh Dị" },
    { label: "🏄‍♂️ Thể Thao", value: "Thể Thao" },
    { label: "🕵️‍♂️ Hình Sự", value: "Hình Sự" },
    { label: "🐷 Harem", value: "Harem" },
];

const FilterBar: React.FC<FilterBarProps> = ({ setIsDrawerOpen, onFilterChange }) => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<Filters>({
        genre: "",
        country: "",
        year: "",
    });

    const handleChange = (field: keyof Filters, value: string) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);

        // đóng Drawer nếu có
        if (setIsDrawerOpen) setIsDrawerOpen(false);

        // gọi callback nếu có
        if (onFilterChange) onFilterChange(newFilters);

        // chuyển hướng luôn
        const queryParams = new URLSearchParams(
            Object.fromEntries(Object.entries(newFilters).filter(([_, v]) => v))
        ).toString();
        navigate(`/filter?${queryParams}`);
    };
    const handleClear = () => {
        const clearedFilters: Filters = { genre: "", country: "", year: "" };
        setFilters(clearedFilters);

        if (setIsDrawerOpen) setIsDrawerOpen(false);
        if (onFilterChange) onFilterChange(clearedFilters);

        navigate(`/filter`);
    };
    return (
        <div className="flex gap-2 items-center text-gray-400 font-semibold ml-4">
            {/* Thể loại */}
            <select
                className="bg-transparent py-1 outline-none"
                value={filters.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
            >
                <option value="" className="text-gray-900">Thể loại</option>
                {genres.map((g) => (
                    <option key={g.value} value={g.value} className="text-gray-900">
                        {g.label}
                    </option>
                ))}
            </select>

            {/* Quốc gia */}
            <select
                className="bg-transparent py-1 outline-none"
                value={filters.country}
                onChange={(e) => handleChange("country", e.target.value)}
            >
                <option value="" className="text-gray-900">Quốc gia</option>
                <option value="Nhật Bản" className="text-gray-900">Nhật Bản</option>
                <option value="Hàn Quốc" className="text-gray-900">Hàn Quốc</option>
                <option value="Mỹ" className="text-gray-900">Mỹ</option>
                <option value="Trung Quốc" className="text-gray-900">Trung Quốc</option>
            </select>

            {/* Năm */}
            <select
                className="bg-transparent px-2 py-1 outline-none"
                value={filters.year}
                onChange={(e) => handleChange("year", e.target.value)}
            >
                <option value="" className="text-gray-900">Năm</option>
                {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                        <option key={year} value={year} className="text-gray-900">
                            {year}
                        </option>
                    );
                })}
            </select>

        </div>
    );
};

export default FilterBar;
