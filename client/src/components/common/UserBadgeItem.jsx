import { FaTimes } from 'react-icons/fa';
import { ChatState } from '../../Context/ChatProvider';

function UserBadgeItem({ handleDelete, user, groupAdminId, isCreatingGroupChat=false}) {
  const { user: loggedInUser } = ChatState();

  const isGroupAdmin = user._id === groupAdminId;
  const isLoggedInAdmin = loggedInUser?._id === groupAdminId;
  const isSelf = user._id === loggedInUser?._id;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-2 py-1 border rounded-lg shadow-md w-fit 
        ${isGroupAdmin ? "bg-yellow-500" : "bg-purple-700"} text-white cursor-default`}
      onClick={(isCreatingGroupChat || (!isGroupAdmin && isLoggedInAdmin)) ? handleDelete : undefined}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="text-sm font-medium truncate capitalize">
          {user?.name}{isGroupAdmin && <span className="text-[10px] ml-1">(Admin)</span>}
        </span>
      </div>

      {
        (isCreatingGroupChat || (!isGroupAdmin && isLoggedInAdmin)) && (
          <FaTimes className="text-gray-100 cursor-pointer" />
        )
      }
    </div>
  );
}

export default UserBadgeItem;
