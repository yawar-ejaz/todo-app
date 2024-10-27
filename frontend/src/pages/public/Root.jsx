import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base text-base-content flex flex-col justify-center items-center">
      <div className="text-center p-10 bg-primary rounded-md flex flex-col gap-4 w-1/2">
        <h1 className="text-4xl font-bold text-base-content">
          Welcome to my todo-App
        </h1>
        <p className="text-lg text-primary-content">
          Stay organized and manage your tasks effortlessly with our simple and
          efficient todo app. Track, prioritize, and complete tasks all in one
          place, with a sleek and intuitive interface.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-success rounded-md"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Root;
