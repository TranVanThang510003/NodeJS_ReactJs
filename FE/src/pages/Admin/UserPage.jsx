
import UserTable from '../../componets/Admin/UserManagement/UserTable.jsx'
const UserPage = () => {

    return (
      <div className="flex flex-col gap-6   min-h-screen">
          <div className="text-3xl font-semibold text-gray-800 ">
              MANAGE USERS
          </div>
          <UserTable/>
      </div>
    );
};

export default UserPage;
