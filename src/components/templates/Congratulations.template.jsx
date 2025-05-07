import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const Congratulations = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen to-white flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-xl w-full text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Congratulations!
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Your ticket has been booked successfully. You will find it in your
          profile under “My Bookings.”
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-secondary text-primary"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Congratulations;
