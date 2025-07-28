import { useNavigate } from "react-router-dom"
import { assets, dummyCarData } from "../assets/assets"
import CarCard from "./CarCard"
import Title from "./Title"

const FeatureSection = () => {
    const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
        <div>
            <Title title="Feaatured Vehicles" subtitle="Explore Our Selection of premium vehicles available for your next adventure." />
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
            {
                dummyCarData.slice(0,6).map((car)=>(
                    <div key={car._id}>
                        <CarCard car={car}/>
                    </div>
                ))
            }
        </div>

        <button
         onClick={()=>{ 
         navigate("/cars"); 
         scrollTo(0,0)
        }} 
         className=" flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-green-50 rounded-md mt-16 cursor-pointer ">
            Explore More Cars <img src={assets.arrow_icon} alt="arrow-icon" />
        </button>

    </div>
  )
}
export default FeatureSection