interface Props {
  onBackClicked?: () => void, 
}

export function Leaderboard({ onBackClicked }: Props) {

  const rankItem = () =>
    <div className="text-white w-full h-16 bg-pink-500 rounded-full">
      <div className="flex flex-row h-full p-4">
        <span className="flex-1 mt-auto mb-auto">
          USERNAME
        </span>
        <span className="mt-auto mb-auto">
          100.00%
        </span>
      </div>
    </div>

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur z-10">
      <div className="w-5/6 max-w-screen-sm h-3/4 z-10 bg-white rounded-xl font-black drop-shadow-lg ">
        <div className="flex flex-row">
          <div className="flex-1 text-2xl m-4 font-bold text-black">
            Leaderboard
          </div>
          <button 
            onClick={onBackClicked}
            className="w-8 h-8 text-2xl m-4 font-bold text-black rounded-full bg-pink-300 hover:bg-pink-200 justify-center">
          </button>
        </div>
        <div className="flex-grow-0 h-5/6 overflow-auto">
          <style jsx>
            {`
                /* width */
                ::-webkit-scrollbar {
                    width: 10px;
                    background: #fae5f2;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                    background: #ffdada;
                    border-radius: 5px;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #8c4c44;
                    border-radius: 5px;
                }

                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                    background: #81362b;
                }
            `}
          </style>
          <div className="flex flex-col p-2 gap-3 bg-pink-100">
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
            {rankItem()}
          </div>
        </div>
      </div>
    </div>
  );
}