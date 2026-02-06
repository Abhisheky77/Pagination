import { useState } from "react";
import Scrollindicator from "./Scroll_Indicator";

function SearchBox({ products, onSearch }) {
    const [searchText, setSearchText] = useState("");
    const [scrollValue, setScrollValue] = useState(0);

console.log(searchText);


    function searchProducts() {
        const filterProducts = products.filter((item) =>
            item.title?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
            item.category?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
            item.brand?.toLowerCase().includes(searchText.trim().toLowerCase()) ||
            item.tags?.some((tag) =>
                tag.toLowerCase().includes(searchText.trim().toLowerCase())
            )
        );
        onSearch(filterProducts);
    }

    function handleSearch() {
        searchProducts();
    }

    function handleRefresh() {
        window.location.reload();
    }

    function getScrollPersentage(value) {
        setScrollValue(value);
    }


    return (
        <div className="sticky top-0 z-20 flex justify-center">


            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">

                <div className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-center">

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />

                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleSearch}
                                className="w-full sm:w-28 h-11 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-medium shadow-md"
                            >
                                Search
                            </button>

                            <button
                                onClick={handleRefresh}
                                className="w-full sm:w-28 h-11 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                <Scrollindicator onScroll={getScrollPersentage} />
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-150 ease-out"
                        style={{
                            width: `${scrollValue}%`,
                            background: "linear-gradient(90deg, #334155, #38bdf8)"
                        }}
                    />
                </div>








            </div>
        </div>
    );
}

export default SearchBox;
