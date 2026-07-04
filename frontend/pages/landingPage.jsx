import { AiOutlineTag } from "react-icons/ai";
import { FaArrowRight, FaAward, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaAddressBook } from "react-icons/fa";
import { FaArrowDownLong, FaLocationDot, FaMapLocation, FaVoicemail } from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import LandingPageReviews from "../src/components/landingPageReviews";


export default function LandingPage(){
    return(
        <div className="w-full h-full flex flex-col bg-gray-50">

            {/* PC VIEW  */}
            <div className="hidden w-full lg:flex flex-col">
                
                {/* Hero Header */}
                <header id="home" className="w-full flex">
                    {/* left div */}
                    <div className="flex w-1/2 p-10">
                        <div className="flex flex-col w-full gap-2">
                            <span className="bg-green-100 w-fit px-4 py-1 rounded-3xl text-green-600 font-bold border-2 border-green-600">New Arival</span>
                            <h1 className="font-bold text-3xl lg:text-7xl mt-2">Upgrade Your</h1>
                            <h1 className="font-bold lg:text-7xl">Tech Life Style</h1>
                            <p className="font-semibold text-xl text-gray-500">Discover the latest gadgets and electronics that make life smarter, easier and better.</p>
                            <div className="flex items-center gap-4">
                                <Link to={"/products"}>
                                    <button className="flex items-center gap-10 bg-accent px-5 py-2 rounded-lg text-white text-xl hover:bg-green-600 transition-colors duration-200 cursor-pointer">Shop now<span className="text-sm"><FaArrowRight/></span></button>
                                </Link>

                                <button className="border-2 border-accent px-5 py-2 rounded-lg text-accent text-xl hover:bg-green-600/70 hover:text-white hover:border-none transition-colors duration-200 cursor-pointer font-bold">Contact us</button>
                            </div>

                            <div className="flex w-full mt-20 gap-4 bg-white rounded-2xl py-3 px-4 shadow-sm">
                                {/* 1 card */}
                                <div className="flex items-center justify-center gap-4 border-r-1 border-gray-300 pr-4">
                                    <div className="bg-green-200 p-2 rounded-full">
                                        <FaAward className="text-accent text-3xl"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-bold">Top Quality Products</p>
                                        <p className="text-gray-500 font-semibold text-sm">premium brands,</p>
                                        <p className="text-gray-500 font-semibold text-sm">high quality</p>
                                    </div>
                                </div>

                                 {/* 2 card */}
                                <div className="flex items-center justify-center gap-4 border-r-1 border-gray-300 px-4">
                                    <div className="bg-green-200 p-2 rounded-full">
                                        <AiOutlineTag  className="text-accent text-3xl"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-bold">Best Prices</p>
                                        <p className="text-gray-500 font-semibold text-sm">Competitive prices,</p>
                                        <p className="text-gray-500 font-semibold text-sm">and great discounts</p>
                                    </div>
                                </div>

                                {/* 3 card */}
                                <div className="flex items-center justify-center gap-4 pl-4">
                                    <div className="bg-green-200 p-2 rounded-full">
                                        <TfiHeadphoneAlt className="text-accent text-3xl"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-bold">Expert Support</p>
                                        <p className="text-gray-500 font-semibold text-sm">We are here to help</p>
                                        <p className="text-gray-500 font-semibold text-sm">you anytime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Div */}
                    <div className="flex w-1/2 justify-center items-center">
                        <div className="w-full h-full relative">
                            {/* Decorative blur blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full blur-[100px] -z-10"></div>
                            <img src="./landing.png" alt="landing page" className="w-full h-full object-contain"></img>
                        </div>
                    </div>
                </header>

                {/* Additional Sections (PC) */}
                <section className="w-full py-16 px-10">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800">Popular Categories</h2>
                            <p className="text-gray-500 mt-2">Find what you are looking for in our collections</p>
                        </div>
                        <Link to="/products" className="flex items-center gap-2 text-accent font-semibold hover:underline">
                            View All <FaArrowRight/>
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {[
                            { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300", count: "120+ Products" },
                            { name: "Smartphones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300", count: "85+ Products" },
                            { name: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300", count: "300+ Products" },
                            { name: "Smart Watches", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300", count: "45+ Products" }
                        ].map((cat, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 shadow-sm hover:shadow-xl transition-all duration-300">
                                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold">{cat.name}</h3>
                                    <p className="text-green-300 font-medium">{cat.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full p-5">
                    <h1 className="text-center font-bold mb-10 text-3xl text-accent">What our Customers Say...</h1>
                    <LandingPageReviews />

                </section>



                {/* Footer (PC) */}
                <footer id="footer" className="w-full bg-gray-900 text-gray-300 mt-20 pt-16 pb-8 px-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 border-b border-gray-800 pb-12">
                        {/* Column 1: Brand */}
                        <div className="flex flex-col gap-6">
                            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
                                I-Tech<span className="text-accent">Solutions</span>
                            </Link>
                            <p className="text-gray-400 leading-relaxed">
                                Discover the latest gadgets and electronics that make life smarter, easier, and better. Your ultimate tech destination.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaFacebookF /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaTwitter /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaInstagram /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaLinkedinIn /></a>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-white font-bold text-lg">Quick Links</h3>
                            <div className="flex flex-col gap-3">
                                <a href="#home" className="hover:text-accent transition-colors w-fit">Home</a>
                                <Link to="/products" className="hover:text-accent transition-colors w-fit">Products</Link>
                                <Link to="/about" className="hover:text-accent transition-colors w-fit">About Us</Link>
                                <a href="#footer" className="hover:text-accent transition-colors w-fit">Contact</a>
                            </div>
                        </div>

                        {/* Column 3: Categories */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-white font-bold text-lg">Categories</h3>
                            <div className="flex flex-col gap-3">
                                <Link to="/products?category=laptops" className="hover:text-accent transition-colors w-fit">Laptops</Link>
                                <Link to="/products?category=smartphones" className="hover:text-accent transition-colors w-fit">Smartphones</Link>
                                <Link to="/products?category=accessories" className="hover:text-accent transition-colors w-fit">Accessories</Link>
                                <Link to="/products?category=watches" className="hover:text-accent transition-colors w-fit">Smart Watches</Link>
                            </div>
                        </div>
                        {/* Column 4: Contact */}
                        <div className="flex flex-col gap-6">
                            <h1 className="text-white font-bold text-lg">Need Help?</h1>
                            <div className="flex flex-col gap-2">
                                <p className="flex gap-2 items-center"><MdOutlineAttachEmail /> support@i-techsolutions.com</p>
                                <p className="flex gap-2 items-center"><FaPhone/> +94 78 665 8978</p>
                                <p className="flex gap-2 items-center"><FaLocationDot />No.111/3, P.B.Wijesundara Mawatha, Colombo.</p>
                            </div>

                        </div>

                    </div>

                    <div className="max-w-7xl mx-auto flex justify-between items-center mt-8">
                        <p className="text-gray-500 text-sm">© 2026 I Tech Solutions. All rights reserved.</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </footer>
            </div>


            {/* MOBILE VIEW */}
            
            <div className="lg:hidden w-full flex flex-col pt-8">
                
                {/* Hero Header  */}
                <header id="home-m" className="w-full flex flex-col">
                    <div className="flex flex-col w-full px-5 items-center mb-6 text-center">
                        <span className="bg-green-100 w-fit px-4 py-1.5 rounded-3xl text-green-600 font-bold border-2 border-green-600 text-xs mb-4 shadow-sm">New Arrival</span>
                        <h1 className="font-extrabold text-4xl text-gray-800 leading-tight">Upgrade Your</h1>
                        <h1 className="font-extrabold text-4xl text-accent leading-tight">Tech Life Style</h1>
                        <p className="font-medium text-sm text-gray-500 mt-4 max-w-[300px]">Discover the latest gadgets and electronics that make life smarter, easier and better.</p>
                        
                        <div className="flex justify-center items-center mt-6 gap-3 w-full max-w-[320px]">
                            <Link to={"/products"} className="flex-1">
                                <button className="w-full flex items-center justify-center gap-2 bg-accent py-3 rounded-xl text-white text-sm font-semibold hover:bg-green-600 transition-colors shadow-md">
                                    Shop now <FaArrowRight className="text-xs"/>
                                </button>
                            </Link>

                            <button className="flex-1 border-2 border-accent py-3 rounded-xl text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-colors">
                                Contact us
                            </button>
                        </div>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full flex justify-center relative px-4">
                        {/* Blob effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/60 rounded-full blur-[60px] -z-10"></div>
                        <img src="./landing.png" className="object-contain w-full max-w-[350px] drop-shadow-2xl" alt="landing page" />
                    </div>

                    {/* Features Cards */}
                    <div className="w-full px-4 mt-8">
                        <div className="flex w-full justify-start items-center gap-3 bg-white rounded-2xl p-4 shadow-sm overflow-x-auto snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {/* 1 card */}
                            <div className="flex items-center justify-start gap-3 border-r border-gray-200 pr-5 snap-center shrink-0">
                                <div className="bg-green-100 p-2.5 rounded-full shrink-0">
                                    <FaAward className="text-accent text-xl"/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-gray-800">Top Quality</p>
                                    <p className="text-gray-500 font-medium text-xs">Premium brands</p>
                                </div>
                            </div>

                            {/* 2 card */}
                            <div className="flex items-center justify-start gap-3 border-r border-gray-200 pr-5 snap-center shrink-0">
                                <div className="bg-green-100 p-2.5 rounded-full shrink-0">
                                    <AiOutlineTag className="text-accent text-xl"/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-gray-800">Best Prices</p>
                                    <p className="text-gray-500 font-medium text-xs">Great discounts</p>
                                </div>
                            </div>

                            {/* 3 card */}
                            <div className="flex items-center justify-start gap-3 snap-center shrink-0 pr-2">
                                <div className="bg-green-100 p-2.5 rounded-full shrink-0">
                                    <TfiHeadphoneAlt className="text-accent text-xl"/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm text-gray-800">Expert Support</p>
                                    <p className="text-gray-500 font-medium text-xs">24/7 available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Additional Sections (Mobile) */}
                <section className="w-full py-12 px-5 mt-4">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Popular Categories</h2>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-500 text-sm">Find what you are looking for</p>
                            <Link to="/products" className="text-accent text-sm font-semibold flex items-center gap-1">
                                All <FaArrowRight className="text-[10px]"/>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200", count: "120+" },
                            { name: "Smartphones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200", count: "85+" },
                            { name: "Accessories", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200", count: "300+" },
                            { name: "Watches", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200", count: "45+" }
                        ].map((cat, i) => (
                            <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer h-40 shadow-sm">
                                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white">
                                    <h3 className="text-lg font-bold leading-tight">{cat.name}</h3>
                                    <p className="text-green-300 font-medium text-xs">{cat.count} Items</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full p-5">
                    <h1 className="text-center font-bold mb-10 text-3xl text-accent">What our Customers Say...</h1>
                    <LandingPageReviews />

                </section>

                {/* Footer (Mobile) */}
                <footer  id="contact-us" className="w-full bg-gray-900 text-gray-300 mt-12 pt-12 pb-8 px-6">
                    <div className="flex flex-col gap-10 border-b border-gray-800 pb-8">
                        {/* Brand */}
                        <div className="flex flex-col gap-4 text-center items-center">
                            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
                                I-Tech<span className="text-accent">Solutions</span>
                            </Link>
                            <p className="text-gray-400 text-sm max-w-sm">
                                Discover the latest gadgets and electronics that make life smarter, easier, and better.
                            </p>
                            <div className="flex gap-4 mt-2">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaFacebookF /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaTwitter /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaInstagram /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"><FaLinkedinIn /></a>
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Quick Links */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-white font-bold">Quick Links</h3>
                                <div className="flex flex-col gap-3 text-sm">
                                    <a href="#home-m" className="hover:text-accent transition-colors">Home</a>
                                    <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
                                    <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
                                    <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-white font-bold">Contact Us</h3>
                                <div className="flex flex-col gap-3 text-sm">
                                    <p className="flex gap-2 items-center"><MdOutlineAttachEmail /> support@itech-solutions.com</p>
                                    <p className="flex gap-2 items-center"><FaPhone/> +94 78 665 8978</p>
                                    <p className="flex gap-2 items-center"><FaLocationDot />No.111/3, P.B.Wijesundara Mawatha, Colombo.</p>
                                </div>
                            </div>


                            
                        </div>

                       
                    </div>

                    <div className="flex flex-col items-center gap-3 mt-8">
                        <div className="flex gap-6 text-xs text-gray-500">
                            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                        <p className="text-gray-500 text-xs">© 2026 I-Tech Solutions. All rights reserved.</p>
                    </div>
                </footer>

            </div>

        </div>
    )
}