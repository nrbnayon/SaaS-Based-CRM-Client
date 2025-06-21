
import { AccountPage } from "../components/Accounts/AccountPage,";
import DashboardHeader from "../components/dashboard-header";


export default function page() {
  return (
    <div className="">
          <DashboardHeader title='Account' />
          <AccountPage/>
          
        </div>
  );
}
