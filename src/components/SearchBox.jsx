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
        <div className=" flex justify-center gap-3 mt-10 sticky top-10 z-10">
            <input type="text" placeholder="Search products..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}
            className=" w-70 h-10  rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white border-2 border-gray-300"/>
             <Button onClick={handleSearch} className=" w-30 h-10 bg-gray-600 hover:bg-gray-700 text-white">Search</Button>
             <Button onClick={handleRefresh} className=" w-30 h-10 bg-red-500 hover:bg-red-600">Refresh</Button>
        </div>
    )
}
export default SearchBox