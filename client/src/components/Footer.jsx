import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div className=" text-gray-500 text-sm mt-60 px-6 md:px-16 lg:px-24 xl:px-32">

            <div className=" flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
                <div>
                    <img src={assets.logo} alt="logo" className=" h-8 md:h-9"/>
                    <p className=" max-w-80 mt-3">
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </p>
                    <div className=" flex items-center gap-3 mt-6">
                        <a href="#"> <img src={assets.facebook_logo} alt="logo" className=" w-5 h-5"/> </a>
                        <a href="#"> <img src={assets.instagram_logo} alt="logo" className=" w-5 h-5"/> </a>
                        <a href="#"> <img src={assets.twitter_logo} alt="logo" className=" w-5 h-5"/> </a>
                        <a href="#"> <img src={assets.gmail_logo} alt="logo" className=" w-5 h-5"/> </a>
                    </div>
                </div>

                <div>
                    <h2 className=" text-base font-medium text-gray-800 uppercase">Quick Links</h2>
                    <ul className=" mt-3 flex flex-col gap-1.5">
                        <li> <a href="#">Home</a> </li>
                        <li> <a href="#">Browse Cars</a> </li>
                        <li> <a href="#">List Your Car</a> </li>
                        <li> <a href="#">About Us</a> </li>
                    </ul>
                </div>

                <div>
                    <h2 className=" text-base font-medium text-gray-800 uppercase">Resource</h2>
                    <ul className=" mt-3 flex flex-col gap-1.5">
                        <li> <a href="#">Help Center</a> </li>
                        <li> <a href="#">Terms of Service</a> </li>
                        <li> <a href="#">Privacy Policy</a> </li>
                        <li> <a href="#">Insurance</a> </li>
                    </ul>
                </div>

                <div>
                    <h2 className=" text-base font-medium text-gray-800 uppercase">Contact</h2>
                    <ul className=" mt-3 flex flex-col gap-1.5">
                        <li>IICT, SUST </li>
                        <li>Sylhet, BD </li>
                        <li>+880 123456789 </li>
                        <li>info@carrental.com </li>
                    </ul>
                </div>

            </div>
            
            <div className=" flex flex-col md:flex-row gap-2 items-center justify-between py-5 ">
                <p>@ {new Date().getFullYear()} Brand. All rights reserved. </p>

                <ul className=" flex items-center gap-4">
                    <li> <a href="#">Privacy</a>  </li>
                    <li>|</li>
                    <li> <a href="#">Terms</a>  </li>
                    <li>|</li>
                    <li> <a href="#">Cookies</a>  </li>
                </ul>
            </div>
            
        </div>
    )
}
export default Footer