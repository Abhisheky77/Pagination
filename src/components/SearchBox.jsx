import { useState } from "react"
import { Button } from "./ui/button";

function SearchBox({products,onSearch}){
    const [searchText,setSearchText] = useState("");
    console.log(searchText);
    console.log(products,"products");
    
   function searchProducts(){ 
    const filterProducts = products.filter((item)=>item.tags.some((tag)=>tag.toLowerCase().includes(searchText.toLowerCase())));
    onSearch(filterProducts)
   }

    function handleSearch(){
        searchProducts()
        setSearchText("")
    }

    function handleRefresh(){
        window.location.reload();
    }
    
    return (
       <div className="sticky top-0 z-20 flex justify-center">
  <div className="bg-white w-full max-w-xl p-4 rounded-2xl shadow-xl">
    
    <div className="flex flex-col sm:flex-row gap-3 items-center">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full h-11 px-4 rounded-lg
                   border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-gray-600"
      />

      {/* Buttons */}
      <div className="flex gap-3 w-full sm:w-auto">
        <button
          onClick={handleSearch}
          className="w-full sm:w-28 h-11 rounded-lg
                     bg-slate-700 hover:bg-slate-800
                     text-white font-medium shadow-md"
        >
          Search
        </button>

        <button
          onClick={handleRefresh}
          className="w-full sm:w-28 h-11 rounded-lg
                     bg-red-500 hover:bg-red-600
                     text-white font-medium shadow-md"
        >
          Refresh
        </button>
      </div>

    </div>
  </div>
</div>


    )
}
export default SearchBox