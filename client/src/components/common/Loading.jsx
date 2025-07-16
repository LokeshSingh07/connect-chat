const Loading = ({ size = 32 }) => {
  return (
    <div className="flex justify-center items-center h-fit mt-4">
      <div
        style={{ width: size, height: size }}
        className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loading;
