import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const NotFoundTemplate = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold text-yellow-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved. Please
        check the URL or return home.
      </p>
      <Button className="bg-secondary text-primary" onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NotFoundTemplate;
