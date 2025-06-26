import React, { useState, useEffect } from "react";
import LogoutBtn from "../components/Header/LogoutBtn";
import {
  Home,
  Users,
  Settings,
  Bell,
  Download,
  BookOpen,
  FileText,
  Eye,
  EyeOff,
  Upload,
  Menu,
  X,
  User,
  Layers,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label as RechartsLabel,
} from "recharts";

// Custom UI Components
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-xl sm:text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    ghost:
      "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100",
    link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  className = "",
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  id,
  name,
  ...props
}) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 ${className}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    id={id}
    name={name}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

const Textarea = ({
  className = "",
  value,
  onChange,
  placeholder,
  rows = 3,
  id,
  ...props
}) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 ${className}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    id={id}
    {...props}
  />
);

const Tabs = ({ children, value, onValueChange, className = "" }) => (
  <div className={className} data-value={value} data-onchange={onValueChange}>
    {children}
  </div>
);

const TabsList = ({ children, className = "" }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400 w-full ${className}`}
  >
    {children}
  </div>
);

const TabsTrigger = ({ children, value, className = "", onClick }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100 ${className}`}
    onClick={() => onClick && onClick(value)}
    data-value={value}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeValue, className = "" }) => {
  if (value !== activeValue) return null;
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  );
};

// Sidebar items
const sidebarItems = [
  { name: "Dashboard", icon: Home },
  { name: "Users", icon: Users },
  { name: "Courses", icon: BookOpen },
  { name: "Notices", icon: FileText },
  { name: "MCQ", icon: BookOpen },
  { name: "Conduct Mock Test", icon: Upload },
  { name: "Publish Study Material", icon: Layers },
  { name: "Notifications", icon: Bell },
  { name: "Assign Role", icon: User },
  { name: "Settings", icon: Settings },
];

// KPI Data
const kpiData = [
  {
    title: "Total Students",
    value: "20",
    icon: Users,
    color: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Active Courses",
    value: "3",
    icon: BookOpen,
    color: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Total Notices",
    value: "8",
    icon: Bell,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
];

// Chart data for different time periods
const chartData = {
  week: [
    { period: "Mon", enrolled: 12 },
    { period: "Tue", enrolled: 15 },
    { period: "Wed", enrolled: 8 },
    { period: "Thu", enrolled: 20 },
    { period: "Fri", enrolled: 18 },
    { period: "Sat", enrolled: 25 },
    { period: "Sun", enrolled: 22 },
  ],
  month: [
    { period: "Week 1", enrolled: 85 },
    { period: "Week 2", enrolled: 92 },
    { period: "Week 3", enrolled: 78 },
    { period: "Week 4", enrolled: 105 },
  ],
  year: [
    { period: "Jan", enrolled: 200 },
    { period: "Feb", enrolled: 450 },
    { period: "Mar", enrolled: 300 },
    { period: "Apr", enrolled: 500 },
    { period: "May", enrolled: 700 },
    { period: "Jun", enrolled: 600 },
    { period: "Jul", enrolled: 800 },
    { period: "Aug", enrolled: 550 },
    { period: "Sep", enrolled: 650 },
    { period: "Oct", enrolled: 720 },
    { period: "Nov", enrolled: 680 },
    { period: "Dec", enrolled: 750 },
  ],
};

// Course purchase data for pie chart
const coursePurchaseData = [
  { name: "Kharidar", value: 8, color: "#3B82F6" },
  { name: "Nayab Subba", value: 6, color: "#10B981" },
  { name: "Sakha Adhikrit", value: 4, color: "#F59E0B" },
  { name: "No Course", value: 2, color: "#6B7280" },
];

// 20 dummy students
const dummyStudents = [
  {
    id: 1,
    name: "Sita Sharma",
    email: "sita.sharma@example.com",
    active: true,
    courses: ["Kharidar", "Nayab Subba"],
  },
  {
    id: 2,
    name: "Ram Thapa",
    email: "ram.thapa@example.com",
    active: false,
    courses: [],
  },
  {
    id: 3,
    name: "Hari Gurung",
    email: "hari.gurung@example.com",
    active: true,
    courses: ["Sakha Adhikrit"],
  },
  {
    id: 4,
    name: "Gita Poudel",
    email: "gita.poudel@example.com",
    active: true,
    courses: ["Kharidar"],
  },
  {
    id: 5,
    name: "Krishna Maharjan",
    email: "krishna.maharjan@example.com",
    active: true,
    courses: ["Nayab Subba", "Sakha Adhikrit"],
  },
  {
    id: 6,
    name: "Sunita Rai",
    email: "sunita.rai@example.com",
    active: false,
    courses: [],
  },
  {
    id: 7,
    name: "Bikash Shrestha",
    email: "bikash.shrestha@example.com",
    active: true,
    courses: ["Kharidar"],
  },
  {
    id: 8,
    name: "Kamala Adhikari",
    email: "kamala.adhikari@example.com",
    active: true,
    courses: ["Nayab Subba"],
  },
  {
    id: 9,
    name: "Raju Tamang",
    email: "raju.tamang@example.com",
    active: true,
    courses: ["Sakha Adhikrit"],
  },
  {
    id: 10,
    name: "Mira Karki",
    email: "mira.karki@example.com",
    active: false,
    courses: [],
  },
  {
    id: 11,
    name: "Deepak Ghimire",
    email: "deepak.ghimire@example.com",
    active: true,
    courses: ["Kharidar", "Sakha Adhikrit"],
  },
  {
    id: 12,
    name: "Sabita Limbu",
    email: "sabita.limbu@example.com",
    active: true,
    courses: ["Nayab Subba"],
  },
  {
    id: 13,
    name: "Nabin Khadka",
    email: "nabin.khadka@example.com",
    active: true,
    courses: ["Kharidar"],
  },
  {
    id: 14,
    name: "Pramila Magar",
    email: "pramila.magar@example.com",
    active: true,
    courses: ["Sakha Adhikrit"],
  },
  {
    id: 15,
    name: "Suresh Gautam",
    email: "suresh.gautam@example.com",
    active: false,
    courses: [],
  },
  {
    id: 16,
    name: "Anita Bajracharya",
    email: "anita.bajracharya@example.com",
    active: true,
    courses: ["Nayab Subba"],
  },
  {
    id: 17,
    name: "Pradeep Oli",
    email: "pradeep.oli@example.com",
    active: true,
    courses: ["Kharidar"],
  },
  {
    id: 18,
    name: "Rashmi Neupane",
    email: "rashmi.neupane@example.com",
    active: true,
    courses: ["Sakha Adhikrit"],
  },
  {
    id: 19,
    name: "Mahesh Basnet",
    email: "mahesh.basnet@example.com",
    active: true,
    courses: ["Nayab Subba", "Kharidar"],
  },
  {
    id: 20,
    name: "Saraswoti Dhakal",
    email: "saraswoti.dhakal@example.com",
    active: true,
    courses: ["Sakha Adhikrit"],
  },
];

// Courses data
const courses = [
  {
    name: "Kharidar",
    image: "/kharidar.png",
    description: "Administrative Officer Position",
  },
  {
    name: "Nayab Subba",
    image: "/subba.png",
    description: "Assistant Officer Position",
  },
  {
    name: "Sakha Adhikrit",
    image: "/adhikrit.png",
    description: "Branch Officer Position",
  },
];

// Initial notices
const initialNotices = [
  {
    id: 1,
    title: "Exam Schedule Released",
    description:
      "The Loksewa exam schedule for 2079 is now out. Check website for details.",
    image: null,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "New Course Added",
    description: "Sakha Adhikrit course has been added from next month.",
    image: null,
    date: "2024-01-10",
  },
];

// Dummy notifications
const dummyNotifications = [
  {
    id: 1,
    title: "New User Registered",
    message: "A new student has signed up for the Loksewa course.",
    time: "2 minutes ago",
    type: "success",
  },
  {
    id: 2,
    title: "Mock Test Completed",
    message: "Ram Thapa completed the Loksewa Mock Test 1.",
    time: "10 minutes ago",
    type: "info",
  },
  {
    id: 3,
    title: "Material Uploaded",
    message: "New study material for Kharidar has been published.",
    time: "1 hour ago",
    type: "success",
  },
  {
    id: 4,
    title: "System Update",
    message: "Dashboard UI has been improved for better experience.",
    time: "Today",
    type: "info",
  },
  {
    id: 5,
    title: "Inactive User Alert",
    message: "Some users have not logged in for 7 days.",
    time: "Yesterday",
    type: "warning",
  },
];

// CSV conversion helper
function convertToCSV(users) {
  const headers = ["ID", "Name", "Email", "Status", "Courses Bought"];
  const rows = users.map((u) => [
    u.id,
    u.name,
    u.email,
    u.active ? "Active" : "Inactive",
    u.courses.length > 0 ? `"${u.courses.join(", ")}"` : "None",
  ]);

  const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
  return csvContent;
}

// Download CSV function
function downloadCSV(data, filename = "users.csv") {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default function AdminDashboard() {
  // System theme mode logic (like StudentDashboard)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userTab, setUserTab] = useState("total");
  const [chartPeriod, setChartPeriod] = useState("month");
  const [notices, setNotices] = useState(initialNotices);

  // Notice form state
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  // Settings form state
  const [settings, setSettings] = useState({
    email: "admin@loksewa.com",
    password: "",
    showPassword: false,
    name: "Admin User",
    profilePic: null,
    profilePicPreview: "adhikrit.png",
  });

  const fileInputRef = React.useRef(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Sidebar items with notification dot
  const sidebarItemsWithNotifications = sidebarItems.map((item) =>
    item.name === "Notifications"
      ? { ...item, hasUnread: dummyNotifications.some((n) => n.type === "success" || n.type === "warning") }
      : item
  );

  // Filter users based on tab
  let filteredUsers = dummyStudents;
  if (active === "Users") {
    if (userTab === "active") {
      filteredUsers = dummyStudents.filter((u) => u.active);
    } else if (userTab === "bought") {
      filteredUsers = dummyStudents.filter((u) => u.courses.length > 0);
    } else if (userTab === "notBought") {
      filteredUsers = dummyStudents.filter((u) => u.courses.length === 0);
    }
  }

  // Notice handlers
  function handleNoticeImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setNoticeForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  }

  function handleNoticeSubmit(e) {
    e.preventDefault();
    if (!noticeForm.title.trim()) {
      alert("Title is required.");
      return;
    }
    const newNotice = {
      id: notices.length + 1,
      title: noticeForm.title,
      description: noticeForm.description,
      image: noticeForm.imagePreview,
      date: new Date().toISOString().split("T")[0],
    };
    setNotices([newNotice, ...notices]);
    setNoticeForm({
      title: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  }

  // Settings handlers
  function handleSettingsChange(e) {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  }

  function handleProfilePicChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setSettings((prev) => ({
        ...prev,
        profilePic: file,
        profilePicPreview: URL.createObjectURL(file),
      }));
    }
  }

  function toggleShowPassword() {
    setSettings((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }

  function handleSettingsSubmit(e) {
    e.preventDefault();
    alert("Settings saved successfully!");
  }

  // Assign Role state and handler
  const [assignRole, setAssignRole] = React.useState("");
  const [assignName, setAssignName] = React.useState("");
  const [assignEmail, setAssignEmail] = React.useState("");
  const [assignSuccess, setAssignSuccess] = React.useState(false);
  function handleAssignRoleSubmit(e) {
    e.preventDefault();
    setAssignSuccess(true);
    setTimeout(() => setAssignSuccess(false), 2000);
    setAssignRole("");
    setAssignName("");
    setAssignEmail("");
  }

  // Lock body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Render functions
  function renderDashboard() {
    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {kpiData.map(({ title, value, icon: Icon, color, bgColor }) => (
            <Card
              key={title}
              className={`${bgColor} border-0 shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl lg:text-3xl font-bold">{value}</p>
                  </div>
                  <div
                    className={`p-2 lg:p-3 rounded-full ${color} text-white`}
                  >
                    <Icon size={20} className="lg:w-6 lg:h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
          {/* Enrollment Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg lg:text-xl">
                  Student Enrollments
                </CardTitle>
                <Tabs
                  value={chartPeriod}
                  onValueChange={setChartPeriod}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                    <TabsTrigger
                      value="week"
                      className="text-xs sm:text-sm"
                      onClick={() => setChartPeriod("week")}
                    >
                      Week
                    </TabsTrigger>
                    <TabsTrigger
                      value="month"
                      className="text-xs sm:text-sm"
                      onClick={() => setChartPeriod("month")}
                    >
                      Month
                    </TabsTrigger>
                    <TabsTrigger
                      value="year"
                      className="text-xs sm:text-sm"
                      onClick={() => setChartPeriod("year")}
                    >
                      Year
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 220 : 300}>
                <LineChart data={chartData[chartPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="enrolled"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Purchase Pie Chart */}
          <Card className="shadow-sm lg:min-w-[420px]">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">
                Course Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 220 : 300}>
                <PieChart>
                  <Pie
                    data={coursePurchaseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {coursePurchaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <style>{`
                .recharts-pie-label-text {
                  font-size: 1rem;
                  font-weight: 500;
                  fill: #374151;
                }
                @media (min-width: 1024px) {
                  .recharts-pie-label-text {
                    font-size: 1.15rem;
                  }
                }
              `}</style>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderUsers() {
    return (
      <div className="space-y-6">
        {/* User Filter Tabs */}
        <Tabs value={userTab} onValueChange={setUserTab} className="w-full">
          <TabsList className="flex w-full gap-2 overflow-x-auto no-scrollbar py-2 px-1 whitespace-nowrap">
            <TabsTrigger
              value="total"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 shadow-sm border
                ${userTab === "total" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-transparent hover:bg-blue-100 dark:hover:bg-gray-600"}`}
              style={{ minWidth: '120px', justifyContent: 'center' }}
              onClick={() => setUserTab("total")}
            >
              <Users size={16} /> Total ({dummyStudents.length})
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 shadow-sm border
                ${userTab === "active" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-transparent hover:bg-blue-100 dark:hover:bg-gray-600"}`}
              style={{ minWidth: '120px', justifyContent: 'center' }}
              onClick={() => setUserTab("active")}
            >
              <CheckCircle size={16} /> Active ({dummyStudents.filter((u) => u.active).length})
            </TabsTrigger>
            <TabsTrigger
              value="bought"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 shadow-sm border
                ${userTab === "bought" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-transparent hover:bg-blue-100 dark:hover:bg-gray-600"}`}
              style={{ minWidth: '140px', justifyContent: 'center' }}
              onClick={() => setUserTab("bought")}
            >
              <BookOpen size={16} /> With Courses ({dummyStudents.filter((u) => u.courses.length > 0).length})
            </TabsTrigger>
            <TabsTrigger
              value="notBought"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 shadow-sm border
                ${userTab === "notBought" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-transparent hover:bg-blue-100 dark:hover:bg-gray-600"}`}
              style={{ minWidth: '140px', justifyContent: 'center' }}
              onClick={() => setUserTab("notBought")}
            >
              <XCircle size={16} /> No Courses ({dummyStudents.filter((u) => u.courses.length === 0).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Users Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg lg:text-xl">
                {userTab === "total" && "All Users"}
                {userTab === "active" && "Active Users"}
                {userTab === "bought" && "Users with Courses"}
                {userTab === "notBought" && "Users without Courses"}
              </CardTitle>
              <Button
                onClick={() => {
                  const csv = convertToCSV(filteredUsers);
                  downloadCSV(csv);
                }}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">#</th>
                    <th className="text-left p-3 text-sm font-medium">Name</th>
                    <th className="text-left p-3 text-sm font-medium hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left p-3 text-sm font-medium">
                      Status
                    </th>
                    <th className="text-left p-3 text-sm font-medium hidden md:table-cell">
                      Courses
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-3 text-sm">{idx + 1}</td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500 sm:hidden">
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-500 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.active
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 text-sm hidden md:table-cell">
                        {user.courses.length > 0
                          ? user.courses.join(", ")
                          : "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderCourses() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
        {courses.map((course) => (
          <Card
            key={course.name}
            className="shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover max-w-full max-h-40"
                onError={(e) => {
                  const target = e.target;
                  target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop`;
                }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
              <p className="text-sm text-gray-500">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  function renderNotices() {
    return (
      <div className="space-y-6">
        {/* Add Notice Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Add New Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div>
                <Label htmlFor="noticeTitle">Title *</Label>
                <Input
                  id="noticeTitle"
                  value={noticeForm.title}
                  onChange={(e) =>
                    setNoticeForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="noticeDescription">Description</Label>
                <Textarea
                  id="noticeDescription"
                  value={noticeForm.description}
                  onChange={(e) =>
                    setNoticeForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label
                  htmlFor="noticeImage"
                  className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Upload size={16} />
                  Upload Image (optional)
                </Label>
                <Input
                  type="file"
                  id="noticeImage"
                  accept="image/*"
                  onChange={handleNoticeImageChange}
                  className="hidden"
                />
                {noticeForm.imagePreview && (
                  <img
                    src={noticeForm.imagePreview}
                    alt="Preview"
                    className="mt-3 max-h-40 rounded border object-cover max-w-full"
                  />
                )}
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Add Notice
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notices List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <Card key={notice.id} className="shadow-sm">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {notice.image && (
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full md:w-48 h-32 object-cover rounded max-w-full"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-gray-500 mb-2">{notice.description}</p>
                    <p className="text-xs text-gray-500">{notice.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function renderMCQ() {
    const dummyMCQs = [
      {
        id: 1,
        question: "What is the capital of Nepal?",
        options: ["Pokhara", "Kathmandu", "Biratnagar", "Lalitpur"],
        answer: "Kathmandu",
      },
      {
        id: 2,
        question: "Who is the current President of Nepal?",
        options: ["Bidya Devi Bhandari", "Ram Chandra Poudel", "Sher Bahadur Deuba", "KP Oli"],
        answer: "Ram Chandra Poudel",
      },
      {
        id: 3,
        question: "Which river is the longest in Nepal?",
        options: ["Koshi", "Gandaki", "Karnali", "Bagmati"],
        answer: "Karnali",
      },
    ];
    return (
      <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full p-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-600 dark:text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16.88 3.549A9 9 0 113.55 16.88M15 9v2a2 2 0 01-2 2H9m12 4v.01' /></svg>
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">MCQ Management</h2>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg text-base w-full sm:w-auto">+ Add MCQ</Button>
        </div>
        {/* Responsive: Cards on mobile, table on md+ */}
        <div className="block md:hidden space-y-4">
          {dummyMCQs.map((mcq) => (
            <div key={mcq.id} className="rounded-xl shadow bg-white dark:bg-gray-800 p-4 flex flex-col gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
              <div className="font-semibold text-lg text-blue-700 dark:text-blue-400 mb-1">Q{mcq.id}. {mcq.question}</div>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
                {mcq.options.map((opt, idx) => (
                  <li key={idx} className={opt === mcq.answer ? 'font-bold text-green-600 dark:text-green-400' : ''}>{opt}</li>
                ))}
              </ul>
              <div className="mt-2">
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">Answer: {mcq.answer}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800 mt-2">
          <table className="min-w-full min-w-[600px] divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Question</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Options</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Answer</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {dummyMCQs.map((mcq, idx) => (
                <tr key={mcq.id} className={`transition ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/30' : ''} hover:bg-blue-50 dark:hover:bg-blue-900/30`}>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">Q{mcq.id}. {mcq.question}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    <ul className="list-disc pl-5 space-y-1">
                      {mcq.options.map((opt, oidx) => (
                        <li key={oidx} className={opt === mcq.answer ? 'font-bold text-green-600 dark:text-green-400' : ''}>{opt}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">{mcq.answer}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderMockTest() {
    const dummyTests = [
      {
        id: 1,
        title: "Loksewa Mock Test 1",
        date: "2024-06-01",
        questions: 20,
        status: "Active",
      },
      {
        id: 2,
        title: "General Knowledge Test",
        date: "2024-05-20",
        questions: 15,
        status: "Completed",
      },
      {
        id: 3,
        title: "Current Affairs Quiz",
        date: "2024-05-10",
        questions: 10,
        status: "Active",
      },
    ];
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Conduct Mock Test</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">+ Create Mock Test</Button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
          <table className="min-w-full min-w-[600px] divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Questions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {dummyTests.map((test) => (
                <tr key={test.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">{test.title}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{test.date}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{test.questions}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${test.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}>{test.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderPublishMaterial() {
    const dummyMaterials = [
      {
        id: 1,
        title: "Nayab Subba Syllabus PDF",
        type: "PDF",
        date: "2024-06-01",
        link: "#",
      },
      {
        id: 2,
        title: "Kharidar Practice Set",
        type: "DOCX",
        date: "2024-05-28",
        link: "#",
      },
      {
        id: 3,
        title: "Sakha Adhikrit Notes",
        type: "PDF",
        date: "2024-05-25",
        link: "#",
      },
    ];
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 flex-wrap">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Publish Study Material</h2>
          <div className="flex-shrink-0">
            <Button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow w-full sm:w-auto">+ Upload Material</Button>
            <input ref={fileInputRef} type="file" className="hidden" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {dummyMaterials.map((mat) => (
            <div key={mat.id} className="rounded-xl shadow bg-white dark:bg-gray-800 p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400 truncate">{mat.title}</h3>
                <p className="text-xs text-gray-500 mb-2">Type: <span className="font-medium text-gray-700 dark:text-gray-200">{mat.type}</span></p>
                <p className="text-xs text-gray-500 mb-4">Uploaded: <span className="font-medium text-gray-700 dark:text-gray-200">{mat.date}</span></p>
              </div>
              <a href={mat.link} className="mt-auto inline-block bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">Download</a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderAssignRole(props) {
    const { role, setRole, name, setName, email, setEmail, success, handleSubmit } = props;
    return (
      <div className="max-w-full sm:max-w-xl mx-auto p-2 sm:p-4 md:p-8">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Assign Role</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter user name"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter user email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2"
            >
              <option value="" disabled>Select a role</option>
              <option value="Content Management">Content Management</option>
              <option value="Accountant">Accountant</option>
              <option value="User Support">User Support</option>
            </select>
          </div>
          <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">Assign Role</Button>
          {success && (
            <div className="text-green-600 dark:text-green-400 font-semibold text-center mt-2">Role assigned!</div>
          )}
        </form>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="max-w-full sm:max-w-2xl mx-auto">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Admin Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSettingsSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img
                    src={settings.profilePicPreview || "/adhikrit.png"}
                    alt="Admin Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback also fails
                      e.target.src = "/adhikrit.png";
                    }}
                  />
                </div>
                <Label
                  htmlFor="profilePic"
                  className="mt-4 cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <User size={16} />
                  Change Profile Picture
                </Label>
                <Input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleSettingsChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={settings.email}
                  onChange={handleSettingsChange}
                  className="mt-1"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={settings.showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={settings.password}
                    onChange={handleSettingsChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={toggleShowPassword}
                  >
                    {settings.showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 max-w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 lg:hidden">
            <img src="/logo.svg" alt="Loksewa Logo" className="h-8 w-auto" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
          {/* Navigation (scrollable) */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarItemsWithNotifications.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-base sm:text-sm ${
                  active === item.name
                    ? darkMode
                      ? "bg-blue-600 text-white shadow"
                      : "bg-blue-500 text-white shadow"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.name === "Notifications" ? (
                  <>
                    <Bell size={18} />
                    <span className="font-medium">Notifications</span>
                    {item.hasUnread && (
                      <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </>
                ) : (
                  <>
                    <item.icon size={18} />
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </button>
            ))}
          </nav>
          {/* Admin Profile Section (sticky bottom) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-inherit">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">AU</div>
              <div>
                <div className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{settings.name}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{settings.email}</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full justify-center ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              className="w-full flex items-center gap-2 justify-center mt-3"
            >
              <LogoutBtn className={`w-full flex items-center gap-2 justify-center mt-3 ${darkMode ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"} text-white font-semibold py-2 rounded-lg transition-colors`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 lg:px-6 py-3 sm:py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden dark:text-gray-200 dark:hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </Button>
              <img src="/logo.svg" alt="Loksewa Logo" className="h-8 w-auto hidden sm:block" />
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 max-w-full overflow-x-auto">
          {/* Render main sections */}
          {active === "Dashboard" && renderDashboard()}
          {active === "Users" && renderUsers()}
          {active === "Courses" && renderCourses()}
          {active === "Notices" && renderNotices()}
          {active === "MCQ" && renderMCQ()}
          {active === "Conduct Mock Test" && renderMockTest()}
          {active === "Publish Study Material" && renderPublishMaterial()}
          {active === "Notifications" && (
            <div className="max-w-full sm:max-w-2xl mx-auto p-2 sm:p-4 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full p-2">
                  <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Notifications</h2>
              </div>
              <div className="space-y-4">
                {dummyNotifications.map((n, idx) => (
                  <div
                    key={n.id}
                    className={`relative rounded-xl shadow p-4 flex items-start gap-4 border-l-4 transition-all duration-300 animate-fade-in bg-white dark:bg-gray-800 hover:shadow-lg cursor-pointer
                      ${n.type === "success" || n.type === "warning"
                        ? "border-blue-500 bg-blue-50/60 dark:bg-blue-950/40"
                        : "border-gray-200 dark:border-gray-700"}
                    `}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Bell className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">{n.title}</h3>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{n.message}</p>
                    </div>
                    {(n.type === "success" || n.type === "warning") && (
                      <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" title="Unread"></span>
                    )}
                  </div>
                ))}
              </div>
              <style>{`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(16px); }
                  to { opacity: 1; transform: none; }
                }
                .animate-fade-in {
                  animation: fade-in 0.5s both;
                }
              `}</style>
            </div>
          )}
          {active === "Assign Role" && renderAssignRole({
            role: assignRole,
            setRole: setAssignRole,
            name: assignName,
            setName: setAssignName,
            email: assignEmail,
            setEmail: setAssignEmail,
            success: assignSuccess,
            handleSubmit: handleAssignRoleSubmit,
          })}
          {active === "Settings" && renderSettings()}
        </div>
      </main>
    </div>
  );
}
