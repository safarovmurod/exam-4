import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Trash2, User as UserIcon } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getUserProfiles, deleteUser, type UserProfile } from "../store/userSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector((state: RootState) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserProfiles());
  }, [dispatch]);

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesUser = u.userName?.toLowerCase().includes(term);
    const matchesName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase().includes(term);
    const matchesEmail = u.email?.toLowerCase().includes(term);
    return matchesUser || matchesName || matchesEmail;
  });

  async function handleDeleteConfirm() {
    if (selectedUser) {
      await dispatch(deleteUser(selectedUser.userId));
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  }

  const apiUrl = import.meta.env.VITE_API || "https://store-api.softclub.tj";

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-[12px]">
          <h1 className="text-[24px] font-[700] text-[#0f172a]">Users</h1>
          <span className="rounded-full bg-[#eff6ff] px-[10px] py-[3px] text-[13px] font-[600] text-[#2563eb]">
            {users.length} users
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-[#fee2e2] border border-[#ef4444] text-[#b91c1c] text-[14px] p-[12px] rounded-[8px]">
          {error}
        </div>
      )}

      <Card className="p-[20px] shadow-sm">
        <div className="relative mb-[20px] max-w-[360px]">
          <Search className="absolute left-[12px] top-[12px] text-[#94a3b8]" size={18} />
          <input
            type="text"
            placeholder="Search users by name, username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[42px] pl-[40px] pr-[12px] rounded-[8px] border border-[#e2e8f0] text-[14px] outline-none focus:border-[#2563eb]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#f1f5f9] text-[12px] font-[600] text-[#64748b]">
                <th className="pb-[12px] pl-[8px]">User</th>
                <th className="pb-[12px]">Email</th>
                <th className="pb-[12px]">Phone</th>
                <th className="pb-[12px]">Role</th>
                <th className="pb-[12px] text-right pr-[8px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-[32px] text-center text-[#64748b]">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-[32px] text-center text-[#64748b]">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const avatarUrl = u.image
                    ? u.image.startsWith("http")
                      ? u.image
                      : `${apiUrl}/images/${u.image}`
                    : null;
                  const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.userName;

                  return (
                    <tr key={u.userId} className="hover:bg-[#f8fafc]">
                      <td className="py-[12px] pl-[8px]">
                        <div className="flex items-center gap-[12px]">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={u.userName}
                              className="h-[38px] w-[38px] rounded-full object-cover border border-[#e2e8f0]"
                            />
                          ) : (
                            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#e0e7ff] text-[#4f46e5]">
                              <UserIcon size={18} />
                            </div>
                          )}
                          <div>
                            <p className="font-[600] text-[#0f172a]">{fullName}</p>
                            <p className="text-[12px] text-[#64748b]">@{u.userName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-[12px] text-[#64748b]">{u.email || "—"}</td>
                      <td className="py-[12px] text-[#64748b]">{u.phoneNumber || "—"}</td>
                      <td className="py-[12px]">
                        <Badge variant="outline" className="font-[500] text-[12px]">
                          User
                        </Badge>
                      </td>
                      <td className="py-[12px] text-right pr-[8px]">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUser(u);
                            setIsDeleteOpen(true);
                          }}
                          className="rounded-[6px] p-[6px] text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444] transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] p-[16px]">
          <div className="w-full max-w-[400px] rounded-[12px] bg-[#ffffff] p-[24px]">
            <h3 className="text-[18px] font-[700] text-[#111827] mb-[8px]">Delete User</h3>
            <p className="text-[14px] text-[#6b7280] mb-[20px]">
              Are you sure you want to delete user{" "}
              <strong className="text-[#111827]">@{selectedUser.userName}</strong>?
            </p>
            <div className="flex justify-end gap-[12px]">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedUser(null);
                }}
                className="px-[16px] py-[8px] text-[14px] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-[16px] py-[8px] text-[14px] bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] font-[500] rounded-[6px] cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

