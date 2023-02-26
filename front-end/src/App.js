import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/admin/Dashboard";
import UserDashboard from "./components/user/Dashboard";
import Calendar from "./components/shares/Calendar";
import AccountsTable from "./components/admin/AccountsTable";
import io from 'socket.io-client'
import NotificationsTable from "./components/user/NotificationsTable";
const socket = io.connect('http://localhost:8000')

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/home" element={<AdminDashboard />}>
            <Route index element={<Calendar/>}/>
            <Route path='/admin/home/calendar' element={<Calendar/>}/>
            <Route path='/admin/home/accounts' element={<AccountsTable/>}/>
        </Route>
        <Route path="/user/home" element={<UserDashboard />}>
            <Route index element={<Calendar/>}/>
            <Route path='/user/home/calendar' element={<Calendar/>}/>
            <Route path='/user/home/notifications' element={<NotificationsTable/>}/>
        </Route>
      </Routes>
  );
}

export default App;
