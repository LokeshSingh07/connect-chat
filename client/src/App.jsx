import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-[500px] h-[400px] mx-auto flex flex-col justify-center items-center gap-5">
      <h1 className="text-xl font-bold">Vite + React</h1>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="w-fit p-2 bg-yellow-300 rounded-lg font-semibold"
        >
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App
