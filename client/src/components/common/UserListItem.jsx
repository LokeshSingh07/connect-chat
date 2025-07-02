

function UserListItem({handleFunction, user}) {


  return (
    <div className="flex items-center gap-4 px-4 py-2 border rounded-lg shadow-md w-full max-w-md hover:bg-blue-500  hover:text-white transition-all delay-100 cursor-pointer"
      onClick={handleFunction}
    >
        <div className="w-12 h-12 bg-gray-300 rounded-full">
            <img src={user?.pic} className='w-full h-full rounded-full'/>
        </div>
        <div className="flex-1">
            <div className="rounded w-full text-sm capitalize">{user?.name}</div>
            <div className="rounded w-1/2 text-xs">{user?.email}</div>
        </div>
    </div>
  )
}

export default UserListItem