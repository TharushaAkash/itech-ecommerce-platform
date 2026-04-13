import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
         <div className= 'w-full h-screen flex items-center bg-accent'>
            {/* Side bar for admin dashboard */}
            <div className="w-[300px] h-full text-white">
                {/* ctr + /  = comment */}
                <h1 className="text-2xl font-bold mb-4">Using Link tag 👌</h1>
                <Link to="/" className="block py-2 hover:bg-gray-700">Home</Link>
                <Link to="/admin" className="block py-2 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className="block py-2 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 hover:bg-gray-700">Users</Link>
                

            </div>

            {/*Dynamic Content area*/}
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl">
                <Routes>
                    <Route path="/" element={<h1>Orders Dashboard</h1>}/>
                    <Route path="/products" element={<h1>Products Dashboard</h1>}/>
                    <Route path="/users" element={<h1>Users Dashboard</h1>}/>
                </Routes>

            </div>
        </div>
    )
}