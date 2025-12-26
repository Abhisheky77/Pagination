import { useEffect, useState } from "react"
import { MdStars } from "react-icons/md";
import { Button } from "./ui/button";
import { HiCurrencyDollar } from "react-icons/hi";
import SearchBox from "./SearchBox";
function Pages() {
    const API_URL = import.meta.env.VITE_PRODUCT_API;
    console.log("API_URL",API_URL);
    

    const [loading,setLoading] = useState(false)
    const [productsData, setProductsData] = useState([])
    const [filterProCard,setFilterProCard] = useState([])
    const [count,setCount] = useState(0)
   const [currentPage,setCurrentPage]= useState(1)
   const pageSize = 20;
    console.log("filterProCard",filterProCard);

    async function fetchData() {
        try {
            setLoading(true);
           const response = await fetch(`${API_URL}?limit=120&skip=0`);
            const jsonData = await response.json();
                
            setProductsData(jsonData.products)
            setFilterProCard(jsonData.products)
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleFilterprouct(data){ 
        setFilterProCard(data)
        setCurrentPage(1);
    }

   if (loading) {
        return (
            <div className="text-red-500 text-3xl  font-semibold flex justify-center items-center h-screen">
                Loading data! Please wait...
            </div>
        );
    }

   const totalPages = Math.ceil(filterProCard.length /pageSize );
   const startIndex = (currentPage - 1) * pageSize ;
   const endIndex = startIndex + pageSize;
   const currentProducts = filterProCard.slice(startIndex,endIndex);

    
    return (
        <div>
            <SearchBox  products={productsData} onSearch={handleFilterprouct}/>
            
            <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10 ">
                {
                    currentProducts && currentProducts.length ?
                        currentProducts.map((productItem) =>
                            <div key={productItem.id} className=" w-80 h-107 rounded-3xl shadow-lg bg-white">

                                <div className=" relative">
                                    <img src={productItem.images[0]}
                                        className="  w-full h-70 object-contain rounded-t-3xl bg-gradient-to-b bg-gradient-to-b from-neutral-100 to-neutral-200   rounded-b-3xl " />
                                    <p className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-1  text-sm font-semibold bg-white/90 rounded-t-md  backdrop-blur  
                                       ${productItem.availabilityStatus === "In Stock"
                                            ? " text-green-700 "
                                            : " text-red-700 "}`}>
                                        {productItem.availabilityStatus}
                                    </p>
                                    { productItem.brand && (<p className=" absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1  text-sm font-semibold   bg-white/70 backdrop-blur-md rounded-b-md shadow-sm ">{productItem.brand}</p>)}
                                </div>

                                <div className=" p-5">
                                    <div className=" flex justify-between ">
                                        <span className="">{productItem.category} </span>
                                        <span className=" flex items-center " > <MdStars className=" text-yellow-500 text-xl mr-1" />{productItem.rating}</span>
                                    </div>

                                    <p className=" py-1 font-semibold ">{productItem.title}</p>

                                    <div className=" flex justify-between">
                                        <span className=" flex items-center font-bold"><HiCurrencyDollar className=" text-yellow-500 text-xl mr-1 " />{productItem.price}</span>
                                        <Button className="w-40 h-10 rounded-xl bg-gray-600 hover:bg-gray-700 text-white shadow-lg cursor-pointer">Buy</Button>
                                    </div>
                                </div>
                            </div>
                        )
                        : <div className=" text-3xl font-semibold text-red-500 ">Product are not founds</div>
                }
            </div>
            <div className="
  flex flex-wrap justify-center items-center
  gap-2 sm:gap-3
  mb-10 px-2
">
  {/* Prev Button */}
  <Button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="
      bg-gray-300 text-black
      hover:bg-gray-400
      disabled:opacity-50
      text-sm sm:text-md
      px-3 sm:px-4
    "
  >
    Prev
  </Button>

  {/* Page Numbers */}
  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
    {[...Array(totalPages)].map((_, index) => (
      <Button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`
          px-3 py-2 sm:px-4 sm:py-2
          text-sm sm:text-md
          rounded-lg border font-semibold
          ${
            currentPage === index + 1
              ? "bg-gray-700 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }
        `}
      >
        {index + 1}
      </Button>
    ))}
  </div>

  {/* Next Button */}
  <Button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="
      bg-gray-300 text-black
      hover:bg-gray-400
      disabled:opacity-50
      text-sm sm:text-md
      px-3 sm:px-4
    "
  >
    Next
  </Button>
</div>

           
        </div>
        
    )
}
export default Pages