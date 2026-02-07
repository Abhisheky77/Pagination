import { useEffect, useState } from "react";

function Scrollindicator({onScroll}){

    const [scrollpercentage,setScrollpercentage] = useState(0)

    function handleScrollPercentage(){
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;

        const hight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const percentage =((scrolled / hight)*100);
        setScrollpercentage(percentage);

        onScroll(percentage)

    }
console.log(scrollpercentage);

    useEffect(()=>{
        window.addEventListener('scroll',handleScrollPercentage);

        return ()=>{
            window.removeEventListener('scroll',handleScrollPercentage)
        }
    },[])

    return null;
}
export default Scrollindicator;