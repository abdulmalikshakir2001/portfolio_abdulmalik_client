
import AdminNavbar from "@/components/admin/AdminNavbar";
import { headers } from "next/headers";

function Dashboard() {
  const headersList = headers();
const domain = headersList.get("host") || "";
const fullUrl = headersList.get('referer') || "";
const pathname = headersList.get('next-url`') || "";
console.log('================================')
console.log(pathname)
console.log(domain)
console.log('================================')

  return (
    <h1>Dashboard</h1>
    
  );
}

export default Dashboard;
