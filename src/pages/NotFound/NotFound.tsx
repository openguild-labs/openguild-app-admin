import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen text-black overflow-auto">
      <div className="flex justify-center mt-[200px] text-2xl xl:text-3xl">404</div>
      <h1 className="text-lg xl:text-xl font-bold text-center mt-5">It looks like you’re lost</h1>

      <div className="flex justify-center mt-8">
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
