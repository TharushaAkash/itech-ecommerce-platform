import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

export default function NotFoundPage() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center">
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-extrabold text-gray-900">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 mt-3">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                {/* Home Button */}
                <Link
                    to="/"
                    className="mt-8 inline-block bg-accent text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                    Go to Home Page
                </Link>

            </div>
        </div>
    );
}