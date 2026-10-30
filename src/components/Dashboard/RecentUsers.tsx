import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import type { UserProfile } from "../../store/userSlice";

interface Props {
  users: UserProfile[];
}

export default function RecentUsers({ users }: Props) {
  const displayUsers = users.slice(0, 6);

  return (
    <Card className="p-[20px] shadow-sm">
      <CardHeader className="p-0 pb-[16px]">
        <CardTitle className="text-[18px] font-[700]">Registered Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#f1f5f9] text-[12px] font-[600] text-[#64748b]">
              <th className="pb-[12px]">Username</th>
              <th className="pb-[12px]">Email</th>
              <th className="pb-[12px]">Phone</th>
              <th className="pb-[12px]">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {displayUsers.map((u) => {
              const roleName = (u as any).userRoles?.[0]?.roleName || "User";
              return (
                <tr key={u.userId} className="hover:bg-[#f8fafc]">
                  <td className="py-[12px] font-[500] text-[#0f172a]">
                    <div className="flex items-center gap-[8px]">
                      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#e2e8f0] text-[12px] font-[600] text-[#475569]">
                        {u.userName.charAt(0).toUpperCase()}
                      </div>
                      <span>{u.userName}</span>
                    </div>
                  </td>
                  <td className="py-[12px] text-[#64748b]">
                    {u.email || "—"}
                  </td>
                  <td className="py-[12px] text-[#64748b]">
                    {u.phoneNumber || "—"}
                  </td>
                  <td className="py-[12px]">
                    <Badge variant={roleName.toLowerCase().includes("admin") ? "success" : "default"}>
                      {roleName}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

