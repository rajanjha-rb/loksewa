import React, { useState, useEffect, useRef } from "react";
import { LogoutBtn } from "../components";

import {
  Bell,
  BookOpen,
  Clock,
  Trophy,
  Target,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Award,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Filter,
  Download,
  Share2,
  Bookmark,
  Timer,
  AlertCircle,
  CheckCircle2,
  LogOut,
} from "lucide-react";

const StudentDashboard = () => {
  // Check for saved theme preference or use system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mockTestStarted, setMockTestStarted] = useState(false);
  const [mockTestCompleted, setMockTestCompleted] = useState(false);
  const [mcqPracticeStarted, setMcqPracticeStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for mock test
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [showMcqFeedback, setShowMcqFeedback] = useState(false);
  const [currentMcqQuestion, setCurrentMcqQuestion] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeCourseTab, setActiveCourseTab] = useState(0);

  const topRef = useRef(null);
  const profileRef = useRef(null);

  // Auto scroll to top when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dark mode toggle with localStorage persistence
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Mock test timer
  useEffect(() => {
    let timer;
    if (mockTestStarted && !mockTestCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && mockTestStarted) {
      setMockTestCompleted(true);
      setMockTestStarted(false);
    }
    return () => clearInterval(timer);
  }, [mockTestStarted, mockTestCompleted, timeLeft]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Mock test questions
  const mockTestQuestions = [
    {
      id: 1,
      question: "What is the full form of FPSC?",
      options: [
        "Federal Public Service Commission",
        "Federal Public Safety Commission",
        "Federal Personnel Service Commission",
        "Federal Public Security Commission",
      ],
      correct: 0,
    },
    {
      id: 2,
      question:
        "Which article of the Constitution of Nepal deals with fundamental rights?",
      options: [
        "Article 16-46",
        "Article 17-47",
        "Article 18-48",
        "Article 19-49",
      ],
      correct: 1,
    },
    {
      id: 3,
      question: "What is the retirement age for civil servants in Nepal?",
      options: ["58 years", "60 years", "62 years", "65 years"],
      correct: 1,
    },
    {
      id: 4,
      question:
        "Which commission is responsible for conducting Lok Sewa examinations?",
      options: [
        "National Planning Commission",
        "Public Service Commission",
        "Election Commission",
        "Constitutional Commission",
      ],
      correct: 1,
    },
    {
      id: 5,
      question:
        "What is the minimum educational qualification for most Lok Sewa positions?",
      options: ["SLC", "10+2", "Bachelor's Degree", "Master's Degree"],
      correct: 2,
    },
    {
      id: 6,
      question:
        "Which level of government has the authority to appoint local civil servants?",
      options: ["Federal", "Provincial", "Local", "All of the above"],
      correct: 2,
    },
    {
      id: 7,
      question: "What is the probation period for new civil servants?",
      options: ["6 months", "1 year", "2 years", "3 years"],
      correct: 1,
    },
    {
      id: 8,
      question: "Which act governs the civil service in Nepal?",
      options: [
        "Civil Service Act 2049",
        "Civil Service Act 2050",
        "Civil Service Act 2051",
        "Civil Service Act 2052",
      ],
      correct: 0,
    },
    {
      id: 9,
      question: "What is the maximum age limit for most Lok Sewa examinations?",
      options: ["35 years", "40 years", "45 years", "50 years"],
      correct: 1,
    },
    {
      id: 10,
      question: "Which ministry oversees the Public Service Commission?",
      options: [
        "Ministry of General Administration",
        "Ministry of Home Affairs",
        "Ministry of Federal Affairs",
        "Prime Minister's Office",
      ],
      correct: 0,
    },
    {
      id: 11,
      question:
        "What is the duration of written examination for most Lok Sewa posts?",
      options: ["2 hours", "3 hours", "4 hours", "5 hours"],
      correct: 1,
    },
    {
      id: 12,
      question: "Which group of civil service has the highest authority?",
      options: ["Special Class", "First Class", "Second Class", "Third Class"],
      correct: 0,
    },
    {
      id: 13,
      question: "What is the passing marks for Lok Sewa written examination?",
      options: ["40%", "45%", "50%", "55%"],
      correct: 1,
    },
    {
      id: 14,
      question: "Which document is mandatory for Lok Sewa application?",
      options: [
        "Birth Certificate",
        "Citizenship Certificate",
        "Character Certificate",
        "All of the above",
      ],
      correct: 3,
    },
    {
      id: 15,
      question: "What is the structure of Nepal's civil service?",
      options: ["4 levels", "5 levels", "6 levels", "7 levels"],
      correct: 1,
    },
    {
      id: 16,
      question: "Which commission investigates corruption in civil service?",
      options: ["CIAA", "NHRC", "PSC", "NPC"],
      correct: 0,
    },
    {
      id: 17,
      question: "What is the appeal process for civil service decisions?",
      options: [
        "Administrative Court",
        "Supreme Court",
        "High Court",
        "Administrative Tribunal",
      ],
      correct: 0,
    },
    {
      id: 18,
      question: "Which principle guides Nepal's civil service?",
      options: ["Merit-based", "Quota-based", "Political", "Traditional"],
      correct: 0,
    },
    {
      id: 19,
      question: "What is the role of NASC in civil service?",
      options: ["Training", "Recruitment", "Policy Making", "All of the above"],
      correct: 0,
    },
    {
      id: 20,
      question: "Which act replaced the old civil service regulations?",
      options: [
        "Civil Service Act 2049",
        "Civil Service Act 2050",
        "Civil Service Act 2051",
        "Civil Service Act 2052",
      ],
      correct: 0,
    },
  ];

  // MCQ Practice questions (30 questions)
  const mcqPracticeQuestions = [
    {
      id: 1,
      question: "What does PSC stand for in Nepal?",
      options: [
        "Public Service Commission",
        "Public Safety Commission",
        "Public Security Commission",
        "Public Service Committee",
      ],
      correct: 0,
      explanation:
        "PSC stands for Public Service Commission, which is the constitutional body responsible for conducting civil service examinations in Nepal.",
    },
    {
      id: 2,
      question: "In which year was the Constitution of Nepal promulgated?",
      options: ["2015", "2072", "Both A and B", "2016"],
      correct: 2,
      explanation:
        "The Constitution of Nepal was promulgated in 2015 AD (2072 BS), making both options correct as they represent the same year in different calendar systems.",
    },
    {
      id: 3,
      question: "How many provinces are there in Nepal?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation:
        "Nepal is divided into 7 provinces according to the Constitution of Nepal 2015.",
    },
    {
      id: 4,
      question: "What is the capital of Gandaki Province?",
      options: ["Pokhara", "Butwal", "Bharatpur", "Gorkha"],
      correct: 0,
      explanation:
        "Pokhara is the capital of Gandaki Province, one of the seven provinces of Nepal.",
    },
    {
      id: 5,
      question: "Which is the highest peak in Nepal?",
      options: ["K2", "Kangchenjunga", "Mount Everest", "Annapurna"],
      correct: 2,
      explanation:
        "Mount Everest (Sagarmatha) is the highest peak in Nepal and the world, standing at 8,848.86 meters.",
    },
    {
      id: 6,
      question: "What is the official language of Nepal?",
      options: ["Hindi", "English", "Nepali", "Maithili"],
      correct: 2,
      explanation:
        "Nepali is the official language of Nepal as per the Constitution, though many other languages are also recognized.",
    },
    {
      id: 7,
      question: "Which river is known as the Ganga of Nepal?",
      options: ["Karnali", "Gandaki", "Koshi", "Bagmati"],
      correct: 0,
      explanation:
        "Karnali is the longest river of Nepal and is often called the Ganga of Nepal.",
    },
    {
      id: 8,
      question: "What is the currency of Nepal?",
      options: ["Rupee", "Dollar", "Euro", "Pound"],
      correct: 0,
      explanation:
        "The Nepalese Rupee (NPR) is the official currency of Nepal.",
    },
    {
      id: 9,
      question: "Which national park is famous for one-horned rhinoceros?",
      options: ["Sagarmatha", "Chitwan", "Bardia", "Langtang"],
      correct: 1,
      explanation:
        "Chitwan National Park is famous for its one-horned rhinoceros and is a UNESCO World Heritage Site.",
    },
    {
      id: 10,
      question: "What is the literacy rate of Nepal approximately?",
      options: ["60%", "65%", "70%", "75%"],
      correct: 1,
      explanation:
        "According to recent census data, the literacy rate of Nepal is approximately 65%.",
    },
    {
      id: 11,
      question: "Which festival is known as the festival of lights in Nepal?",
      options: ["Dashain", "Tihar", "Holi", "Teej"],
      correct: 1,
      explanation:
        "Tihar is known as the festival of lights in Nepal, similar to Diwali in India.",
    },
    {
      id: 12,
      question: "What is the area of Nepal?",
      options: [
        "147,181 sq km",
        "148,181 sq km",
        "149,181 sq km",
        "150,181 sq km",
      ],
      correct: 0,
      explanation: "Nepal covers an area of 147,181 square kilometers.",
    },
    {
      id: 13,
      question: "Which is the largest lake in Nepal?",
      options: ["Phewa Lake", "Rara Lake", "Begnas Lake", "Tilicho Lake"],
      correct: 1,
      explanation:
        "Rara Lake is the largest lake in Nepal, located in Rara National Park.",
    },
    {
      id: 14,
      question: "What is the population of Nepal approximately?",
      options: ["25 million", "30 million", "35 million", "40 million"],
      correct: 1,
      explanation:
        "According to the latest census, Nepal's population is approximately 30 million.",
    },
    {
      id: 15,
      question: "Which is the smallest district of Nepal?",
      options: ["Bhaktapur", "Kathmandu", "Lalitpur", "Manang"],
      correct: 0,
      explanation: "Bhaktapur is the smallest district of Nepal by area.",
    },
    {
      id: 16,
      question: "What is the maximum tenure of the President of Nepal?",
      options: ["4 years", "5 years", "6 years", "7 years"],
      correct: 1,
      explanation:
        "The President of Nepal serves for a maximum tenure of 5 years.",
    },
    {
      id: 17,
      question: "Which article deals with the right to equality?",
      options: ["Article 17", "Article 18", "Article 19", "Article 20"],
      correct: 1,
      explanation:
        "Article 18 of the Constitution of Nepal deals with the right to equality.",
    },
    {
      id: 18,
      question: "What is the minimum age for the President of Nepal?",
      options: ["35 years", "40 years", "45 years", "50 years"],
      correct: 2,
      explanation:
        "The minimum age requirement for the President of Nepal is 45 years.",
    },
    {
      id: 19,
      question: "Which is the legislative parliament of Nepal?",
      options: [
        "House of Representatives",
        "National Assembly",
        "Federal Parliament",
        "Provincial Assembly",
      ],
      correct: 2,
      explanation:
        "The Federal Parliament is the legislative body of Nepal, consisting of House of Representatives and National Assembly.",
    },
    {
      id: 20,
      question: "What is the term of House of Representatives?",
      options: ["4 years", "5 years", "6 years", "7 years"],
      correct: 1,
      explanation: "The House of Representatives has a term of 5 years.",
    },
    {
      id: 21,
      question: "Which commission is responsible for human rights?",
      options: ["NHRC", "CIAA", "PSC", "EC"],
      correct: 0,
      explanation:
        "NHRC (National Human Rights Commission) is responsible for human rights protection and promotion.",
    },
    {
      id: 22,
      question: "What is the retirement age for judges of Supreme Court?",
      options: ["62 years", "65 years", "68 years", "70 years"],
      correct: 1,
      explanation:
        "The retirement age for judges of Supreme Court is 65 years.",
    },
    {
      id: 23,
      question: "Which is the highest court in Nepal?",
      options: [
        "High Court",
        "District Court",
        "Supreme Court",
        "Administrative Court",
      ],
      correct: 2,
      explanation:
        "The Supreme Court is the highest court in Nepal's judicial system.",
    },
    {
      id: 24,
      question: "What is the quorum for National Assembly?",
      options: ["1/3", "1/4", "1/2", "2/3"],
      correct: 1,
      explanation:
        "The quorum for National Assembly is one-fourth of the total members.",
    },
    {
      id: 25,
      question: "Which article deals with the right to information?",
      options: ["Article 27", "Article 28", "Article 29", "Article 30"],
      correct: 0,
      explanation:
        "Article 27 of the Constitution deals with the right to information.",
    },
    {
      id: 26,
      question: "What is the total number of fundamental rights?",
      options: ["31", "32", "33", "34"],
      correct: 0,
      explanation:
        "There are 31 fundamental rights mentioned in the Constitution of Nepal.",
    },
    {
      id: 27,
      question: "Which body approves the annual budget?",
      options: [
        "President",
        "Prime Minister",
        "Parliament",
        "Council of Ministers",
      ],
      correct: 2,
      explanation: "The Parliament approves the annual budget of Nepal.",
    },
    {
      id: 28,
      question: "What is the term of local government?",
      options: ["4 years", "5 years", "6 years", "3 years"],
      correct: 1,
      explanation: "The term of local government in Nepal is 5 years.",
    },
    {
      id: 29,
      question: "Which commission conducts local elections?",
      options: ["PSC", "CIAA", "Election Commission", "NHRC"],
      correct: 2,
      explanation:
        "The Election Commission conducts all elections including local elections in Nepal.",
    },
    {
      id: 30,
      question: "What is the voting age in Nepal?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correct: 1,
      explanation: "The voting age in Nepal is 18 years for all citizens.",
    },
  ];

  // Notifications data
  const notifications = [
    {
      id: 1,
      title: "New Course Available",
      message: "Advanced Lok Sewa Preparation course is now live!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Mock Test Results",
      message: "Your latest mock test results are ready for review.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      title: "Study Reminder",
      message: "Don't forget to complete today's practice questions.",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 4,
      title: "New Feature",
      message: "MCQ Practice section has been updated with new questions.",
      time: "3 days ago",
      unread: false,
    },
  ];

  // Sample course data
  const enrolledCourses = [
    {
      id: 1,
      title: "Lok Sewa Preparation - Complete Course",
      instructor: "Prof. Ram Sharma",
      progress: 75,
      duration: "120 hours",
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      category: "Government Job Preparation",
    },
    {
      id: 2,
      title: "General Knowledge Mastery",
      instructor: "Dr. Sita Devi",
      progress: 60,
      duration: "80 hours",
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      category: "General Knowledge",
    },
    {
      id: 3,
      title: "English Language Skills",
      instructor: "John Miller",
      progress: 90,
      duration: "60 hours",
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
      category: "Language",
    },
  ];

  const availableCourses = [
    {
      id: 4,
      title: "Advanced Mathematics for Competitive Exams",
      instructor: "Prof. Hari Prasad",
      price: "Rs. 5,000",
      duration: "100 hours",
      rating: 4.7,
      students: 1250,
      thumbnail:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      category: "Mathematics",
    },
    {
      id: 5,
      title: "Current Affairs 2024",
      instructor: "Ms. Kamala Thapa",
      price: "Rs. 3,000",
      duration: "40 hours",
      rating: 4.5,
      students: 890,
      thumbnail:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop",
      category: "Current Affairs",
    },
    {
      id: 6,
      title: "Constitution of Nepal - Detailed Study",
      instructor: "Adv. Bishnu Gautam",
      price: "Rs. 4,500",
      duration: "75 hours",
      rating: 4.8,
      students: 670,
      thumbnail:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
      category: "Law & Constitution",
    },
  ];

  // Handle mock test
  const startMockTest = () => {
    setMockTestStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
    setMockTestCompleted(false);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMockTestAnswer = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitMockTest = () => {
    setMockTestCompleted(true);
    setMockTestStarted(false);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateMockTestScore = () => {
    let correct = 0;
    mockTestQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  // Handle MCQ Practice
  const startMcqPractice = () => {
    setMcqPracticeStarted(true);
    setCurrentMcqQuestion(0);
    setMcqAnswers({});
    setShowMcqFeedback(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMcqAnswer = (questionId, answerIndex) => {
    setMcqAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
    setShowMcqFeedback(true);

    setTimeout(() => {
      if (currentMcqQuestion < mcqPracticeQuestions.length - 1) {
        setCurrentMcqQuestion((prev) => prev + 1);
        setShowMcqFeedback(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setMcqPracticeStarted(false);
        setCurrentMcqQuestion(0);
      }
    }, 3000);
  };

  const resetMcqPractice = () => {
    setMcqPracticeStarted(false);
    setCurrentMcqQuestion(0);
    setMcqAnswers({});
    setShowMcqFeedback(false);
  };

  // Sidebar navigation items (without Notifications)
  const sidebarItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "courses", icon: BookOpen, label: "Courses" },
    { id: "study-material", icon: Award, label: "Study Material" },
    { id: "mock-test", icon: Clock, label: "Mock Test" },
    { id: "mcq-practice", icon: Target, label: "MCQ Practice" },
    { id: "profile", icon: User, label: "Profile" },
    // Notifications will be inserted here as second last
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  // Insert Notifications as second last
  const sidebarWithNotifications = [
    ...sidebarItems.slice(0, -1),
    { id: "notifications", icon: Bell, label: "Notifications" },
    sidebarItems[sidebarItems.length - 1],
  ];

  // Dummy notification data
  const dummyNotifications = [
    { id: 1, title: "New Course Available", message: "Advanced Lok Sewa Preparation course is now live!", time: "2 hours ago", unread: true },
    { id: 2, title: "Mock Test Results", message: "Your latest mock test results are ready for review.", time: "1 day ago", unread: true },
    { id: 3, title: "Study Reminder", message: "Don't forget to complete today's practice questions.", time: "2 days ago", unread: false },
    { id: 4, title: "New Feature", message: "MCQ Practice section has been updated with new questions.", time: "3 days ago", unread: false },
    { id: 5, title: "Exam Alert", message: "Lok Sewa exam dates have been announced.", time: "4 days ago", unread: true },
    { id: 6, title: "Leaderboard Update", message: "You are now in the top 10% of students!", time: "5 days ago", unread: false },
  ];

  // Filter courses based on search and category
  const filteredAvailableCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Dummy study materials
  const studyMaterials = [
    {
      id: 1,
      title: "Nayab Subba Study Guide",
      description: "Comprehensive guide for Nayab Subba exam preparation including syllabus, notes, and practice questions.",
      file: "nayab_subba_material.pdf",
      category: "Nayab Subba",
    },
    {
      id: 2,
      title: "Kharidar Exam Notes",
      description: "Important notes and solved questions for Kharidar post.",
      file: "kharidar_notes.pdf",
      category: "Kharidar",
    },
    {
      id: 3,
      title: "Sakha Adhikrit Reference Book",
      description: "Reference book for Sakha Adhikrit with model questions and answers.",
      file: "sakha_adhikrit_reference.pdf",
      category: "Sakha Adhikrit",
    },
  ];

  return (
    <div
      ref={topRef}
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Mobile Header Row: Hamburger + Search */}
        <div className="flex items-center gap-2 w-full px-2 py-2 sm:hidden">
          {/* Only show hamburger if sidebar is closed */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center h-10 w-10 ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border transition-colors text-sm w-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
        </div>
        {/* Desktop/Tablet Header */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between px-4 lg:px-6 h-auto sm:h-16 gap-2 sm:gap-0">
          {/* Left section (empty for now, could add logo) */}
          <div className="flex items-center w-full sm:w-auto justify-between">
            {/* Hamburger hidden on sm+ */}
          </div>
          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
            {/* Search - visible on md+ */}
            <div className="hidden md:flex relative w-64">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border transition-colors text-sm w-full ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-yellow-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Notifications - only on large screens */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Bell size={20} />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              {/* Notifications dropdown */}
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-80 max-w-[95vw] sm:max-w-xs rounded-xl shadow-2xl border z-50 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                  style={{ minWidth: '260px' }}
                >
                  <div
                    className={`p-4 border-b ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <h3
                      className={`font-semibold text-sm ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b last:border-b-0 hover:bg-opacity-50 transition-colors cursor-pointer text-base sm:text-sm ${
                          isDarkMode
                            ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                            : "border-gray-100 hover:bg-gray-50 text-gray-600"
                        } ${
                          notification.unread
                            ? "bg-blue-50 dark:bg-blue-950"
                            : ""
                        }`}
                        style={{ minHeight: '56px' }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4
                              className={`font-medium text-sm ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p
                              className={`text-xs mt-1 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <span
                              className={`text-xs mt-2 block ${
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {notification.time}
                            </span>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                JS
              </button>
              {showProfileDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleTabChange("profile");
                        setShowProfileDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleTabChange("settings");
                        setShowProfileDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Settings
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <div className="px-4 py-2">
                      <LogoutBtn className={`w-full flex items-center gap-2 justify-start ${isDarkMode ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"}`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
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
              <span className="font-bold text-lg text-gray-800 dark:text-white">Menu</span>
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
              {sidebarWithNotifications.map((item) => (
                item.id === "notifications" ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-base sm:text-sm ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Bell size={18} />
                    <span className="font-medium">Notifications</span>
                    {dummyNotifications.some((n) => n.unread) && (
                      <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </button>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleTabChange(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-base sm:text-sm ${
                      activeTab === item.id
                        ? isDarkMode
                          ? "bg-blue-600 text-white shadow"
                          : "bg-blue-500 text-white shadow"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              ))}
            </nav>
            {/* Sidebar Notifications Dropdown */}
            {showNotifications && sidebarOpen && (
              <div
                className={`mt-2 w-full rounded-xl shadow-2xl border z-50 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
                style={{ minWidth: '220px', maxWidth: '95vw' }}
              >
                <div
                  className={`p-4 border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <h3
                    className={`font-semibold text-sm ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-opacity-50 transition-colors cursor-pointer text-base sm:text-sm ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-700 text-gray-300"
                          : "border-gray-100 hover:bg-gray-50 text-gray-600"
                      } ${
                        notification.unread
                          ? "bg-blue-50 dark:bg-blue-950"
                          : ""
                      }`}
                      style={{ minHeight: '56px' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`font-medium text-sm ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p
                            className={`text-xs mt-1 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <span
                            className={`text-xs mt-2 block ${
                              isDarkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {notification.time}
                          </span>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Profile/Logout (sticky bottom) */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 lg:hidden bg-inherit">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">JS</div>
                <div>
                  <div className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Smith</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Aspiring Civil Servant</div>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full justify-center ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <LogoutBtn className={`w-full flex items-center gap-2 justify-center mt-3 ${isDarkMode ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"} text-white font-semibold py-2 rounded-lg transition-colors`} />
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              style={{ touchAction: 'auto' }}
              onClick={() => setSidebarOpen(false)}
            ></div>
            {/* Prevent background scroll when sidebar is open on mobile */}
            <style>{`body { overflow: hidden !important; }`}</style>
          </>
        )}

        {/* Main content: hide on mobile when sidebar is open */}
        <main className={`flex-1 p-2 sm:p-4 lg:p-6 min-w-0 ${sidebarOpen ? 'hidden lg:block' : ''}`}>
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Welcome Section */}
              <div
                className={`rounded-xl p-4 sm:p-6 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                } text-white`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="mb-2 lg:mb-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                      Welcome back, John!
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base">
                      Ready to ace your Lok Sewa preparation today?
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => handleTabChange("mock-test")}
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
                    >
                      Take Mock Test
                    </button>
                    <button
                      onClick={() => handleTabChange("mcq-practice")}
                      className="bg-white bg-opacity-20 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors text-sm"
                    >
                      Practice MCQs
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    title: "Courses Enrolled",
                    value: "3",
                    icon: BookOpen,
                    color: "blue",
                  },
                  {
                    title: "Tests Completed",
                    value: "12",
                    icon: CheckCircle,
                    color: "green",
                  },
                  {
                    title: "Study Hours",
                    value: "48",
                    icon: Clock,
                    color: "purple",
                  },
                  {
                    title: "Average Score",
                    value: "85%",
                    icon: Trophy,
                    color: "yellow",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-4 transition-transform hover:scale-[1.02] ${
                      isDarkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-100"
                    } shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {stat.title}
                        </p>
                        <p
                          className={`text-2xl font-bold mt-1 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          stat.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : stat.color === "green"
                            ? "bg-green-100 text-green-600"
                            : stat.color === "purple"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        <stat.icon size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div
                className={`rounded-xl p-3 sm:p-4 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow`}
              >
                <h2
                  className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Recent Activity
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      action: "Completed Mock Test #5",
                      time: "2 hours ago",
                      score: "78%",
                    },
                    {
                      action: "Finished General Knowledge Chapter",
                      time: "1 day ago",
                      score: "92%",
                    },
                    {
                      action: "Practice Session - English",
                      time: "2 days ago",
                      score: "85%",
                    },
                    {
                      action: "Mock Test #4",
                      time: "3 days ago",
                      score: "82%",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            parseInt(activity.score) >= 85
                              ? "bg-green-500"
                              : parseInt(activity.score) >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p
                            className={`font-medium text-sm ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {activity.action}
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseInt(activity.score) >= 85
                            ? "bg-green-100 text-green-800"
                            : parseInt(activity.score) >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Search and Filter - Mobile visible */}
              {/* Remove mobile search bar, keep only header search */}

              {/* My Enrolled Courses - TABS */}
              <div>
                <h2
                  className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  My Enrolled Courses
                </h2>
                {enrolledCourses.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">You have not enrolled in any courses yet.</div>
                ) : (
                  <>
                    {/* Tabs for each enrolled course */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
                      {enrolledCourses.map((course, idx) => (
                        <button
                          key={course.id}
                          onClick={() => setActiveCourseTab(idx)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 shadow-sm border whitespace-nowrap truncate
                            ${activeCourseTab === idx
                              ? "bg-blue-600 text-white border-blue-600 shadow-md"
                              : isDarkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700 hover:bg-blue-900"
                                : "bg-gray-200 text-gray-700 border-transparent hover:bg-blue-100"}
                            `}
                          style={{ minWidth: '64px', maxWidth: '80px', justifyContent: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          <BookOpen size={16} /> <span className="truncate">{course.tabLabel || course.title}</span>
                        </button>
                      ))}
                    </div>
                    {/* Active course info card */}
                    <div className={`rounded-2xl overflow-hidden shadow-xl max-w-full sm:max-w-md mx-auto mb-8 backdrop-blur-md bg-white/70 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 transition-all duration-300`} style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
                      <div className="relative">
                        <img
                          src={enrolledCourses[activeCourseTab]?.thumbnail}
                          alt={enrolledCourses[activeCourseTab]?.title}
                          className="w-full h-32 sm:h-36 object-cover object-center border-b border-blue-100 dark:border-blue-900"
                          style={{borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem'}} />
                        <div className="absolute top-2 right-2">
                          <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">Enrolled</span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isDarkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"}`}>{enrolledCourses[activeCourseTab]?.category}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{enrolledCourses[activeCourseTab]?.rating}</span>
                          </div>
                        </div>
                        <h3 className={`font-bold text-base mb-0.5 truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{enrolledCourses[activeCourseTab]?.title}</h3>
                        <p className={`text-xs mb-2 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>By {enrolledCourses[activeCourseTab]?.instructor}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Progress</span>
                          <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{enrolledCourses[activeCourseTab]?.progress}%</span>
                        </div>
                        <div className={`w-full bg-gray-200 rounded-full h-1.5 mb-2 ${isDarkMode ? "bg-gray-700" : ""}`}> <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${enrolledCourses[activeCourseTab]?.progress}%` }}></div> </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{enrolledCourses[activeCourseTab]?.duration}</span>
                        </div>
                        {/* Zoom and Google Meet links */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <a href="https://zoom.us/j/1234567890" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-full shadow transition text-xs"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 10.5V7.75C17.5 6.784 16.716 6 15.75 6h-11.5C3.284 6 2.5 6.784 2.5 7.75v8.5C2.5 17.216 3.284 18 4.25 18h11.5c.966 0 1.75-.784 1.75-1.75V13.5l3.25 2.5v-7l-3.25 2.5z"></path></svg> Zoom</a>
                          <a href="https://meet.google.com/abc-defg-hij" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-full shadow transition text-xs"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7v4.59l3.7 3.7 1.42-1.42L13.41 12H12V7zm8.7 2.3l-2.3-2.3c-.19-.19-.45-.3-.7-.3H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6c0-.25-.11-.51-.3-.7z"></path></svg> Meet</a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Available Courses */}
              <div>
                <h2
                  className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Available Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredAvailableCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`rounded-xl overflow-hidden shadow transition-transform hover:scale-[1.02] ${
                        isDarkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border border-gray-100"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-32 sm:h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            className={`p-1.5 rounded-full transition-colors ${
                              isDarkMode
                                ? "bg-gray-800 text-gray-300 hover:text-red-400"
                                : "bg-white text-gray-600 hover:text-red-500"
                            }`}
                          >
                            <Bookmark size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                          <span
                            className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                              isDarkMode
                                ? "bg-purple-900 text-purple-300"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            {course.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{course.rating}</span>
                          </div>
                        </div>
                        <h3 className={`font-bold text-base mb-0.5 truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.title}</h3>
                        <p className={`text-xs mb-2 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>By {course.instructor}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Duration</span>
                          <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{course.price}</span>
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{course.students} students</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <button className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-full shadow transition text-xs">Enroll</button>
                          <button className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-1.5 rounded-full shadow transition text-xs dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mock Test Tab */}
          {activeTab === "mock-test" && (
            <div className="max-w-4xl mx-auto">
              {!mockTestStarted && !mockTestCompleted && (
                <div
                  className={`rounded-xl p-6 text-center ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      isDarkMode ? "bg-blue-600" : "bg-blue-500"
                    }`}
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h1
                    className={`text-2xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Lok Sewa Mock Test
                  </h1>
                  <p
                    className={`text-base mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Test your preparation with our comprehensive mock test
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <Target
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        20 Questions
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Carefully selected questions
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <Timer
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        30 Minutes
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Standard time limit
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <Trophy
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-yellow-400" : "text-yellow-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Instant Results
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Get score immediately
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={startMockTest}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2"
                  >
                    <Play size={18} />
                    <span>Start Mock Test</span>
                  </button>
                </div>
              )}

              {mockTestStarted && (
                <div
                  className={`rounded-xl p-6 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  {/* Timer and Progress */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                      <div
                        className={`px-3 py-1.5 rounded-lg ${
                          timeLeft < 300
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span className="font-mono font-medium text-sm">
                            {formatTime(timeLeft)}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Question {currentQuestion + 1} of{" "}
                        {mockTestQuestions.length}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={submitMockTest}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                      >
                        Submit Test
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`w-full bg-gray-200 rounded-full h-1.5 mb-6 ${
                      isDarkMode ? "bg-gray-700" : ""
                    }`}
                  >
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestion + 1) / mockTestQuestions.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <h2
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {mockTestQuestions[currentQuestion]?.question}
                    </h2>

                    <div className="space-y-3">
                      {mockTestQuestions[currentQuestion]?.options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleMockTestAnswer(
                                mockTestQuestions[currentQuestion].id,
                                index
                              )
                            }
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              answers[mockTestQuestions[currentQuestion].id] ===
                              index
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : isDarkMode
                                ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  answers[
                                    mockTestQuestions[currentQuestion].id
                                  ] === index
                                    ? "border-blue-500 bg-blue-500"
                                    : isDarkMode
                                    ? "border-gray-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {answers[
                                  mockTestQuestions[currentQuestion].id
                                ] === index && (
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}. {option}
                              </span>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        setCurrentQuestion(Math.max(0, currentQuestion - 1))
                      }
                      disabled={currentQuestion === 0}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        currentQuestion === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-500 hover:bg-gray-600 text-white"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentQuestion(
                          Math.min(
                            mockTestQuestions.length - 1,
                            currentQuestion + 1
                          )
                        )
                      }
                      disabled={
                        currentQuestion === mockTestQuestions.length - 1
                      }
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        currentQuestion === mockTestQuestions.length - 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {mockTestCompleted && (
                <div
                  className={`rounded-xl p-6 text-center ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      calculateMockTestScore() >= 15
                        ? "bg-green-500"
                        : calculateMockTestScore() >= 10
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    <Trophy className="w-8 h-8 text-white" />
                  </div>

                  <h1
                    className={`text-2xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Test Completed!
                  </h1>

                  <div
                    className={`text-5xl font-bold mb-3 ${
                      calculateMockTestScore() >= 15
                        ? "text-green-500"
                        : calculateMockTestScore() >= 10
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {calculateMockTestScore()}/20
                  </div>

                  <p
                    className={`text-lg mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    You scored{" "}
                    {Math.round((calculateMockTestScore() / 20) * 100)}%
                  </p>

                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      🎉 Test completed successfully!
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Your detailed feedback and performance analysis will be
                      available soon.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setMockTestCompleted(false);
                        setShowResult(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Take Another Test
                    </button>
                    <button
                      onClick={() => handleTabChange("dashboard")}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MCQ Practice Tab */}
          {activeTab === "mcq-practice" && (
            <div className="max-w-4xl mx-auto">
              {!mcqPracticeStarted && (
                <div
                  className={`rounded-xl p-6 text-center ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      isDarkMode ? "bg-purple-600" : "bg-purple-500"
                    }`}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h1
                    className={`text-2xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    MCQ Practice Session
                  </h1>
                  <p
                    className={`text-base mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Practice with 30 carefully selected Lok Sewa questions
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <BookOpen
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-purple-400" : "text-purple-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        30 Questions
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Comprehensive question bank
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <CheckCircle
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Instant Feedback
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Immediate feedback
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <AlertCircle
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-500"
                        }`}
                      />
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Detailed Explanations
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Learn from explanations
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={startMcqPractice}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2"
                  >
                    <Play size={18} />
                    <span>Start Practice</span>
                  </button>
                </div>
              )}

              {mcqPracticeStarted && (
                <div
                  className={`rounded-xl p-6 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-100"
                  } shadow-lg`}
                >
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-sm font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Question {currentMcqQuestion + 1} of{" "}
                        {mcqPracticeQuestions.length}
                      </span>
                    </div>
                    <button
                      onClick={resetMcqPractice}
                      className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                    >
                      Reset
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`w-full bg-gray-200 rounded-full h-1.5 mb-6 ${
                      isDarkMode ? "bg-gray-700" : ""
                    }`}
                  >
                    <div
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentMcqQuestion + 1) /
                            mcqPracticeQuestions.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <h2
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {mcqPracticeQuestions[currentMcqQuestion]?.question}
                    </h2>

                    <div className="space-y-3">
                      {mcqPracticeQuestions[currentMcqQuestion]?.options.map(
                        (option, index) => {
                          const isSelected =
                            mcqAnswers[
                              mcqPracticeQuestions[currentMcqQuestion].id
                            ] === index;
                          const isCorrect =
                            index ===
                            mcqPracticeQuestions[currentMcqQuestion].correct;
                          const showFeedback =
                            showMcqFeedback &&
                            mcqAnswers[
                              mcqPracticeQuestions[currentMcqQuestion].id
                            ] !== undefined;

                          return (
                            <button
                              key={index}
                              onClick={() =>
                                !showMcqFeedback &&
                                handleMcqAnswer(
                                  mcqPracticeQuestions[currentMcqQuestion].id,
                                  index
                                )
                              }
                              disabled={showMcqFeedback}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                showFeedback
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                                    : isSelected
                                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                                    : isDarkMode
                                    ? "border-gray-600 bg-gray-700"
                                    : "border-gray-200 bg-gray-50"
                                  : isSelected
                                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                                  : isDarkMode
                                  ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    showFeedback
                                      ? isCorrect
                                        ? "border-green-500 bg-green-500"
                                        : isSelected
                                        ? "border-red-500 bg-red-500"
                                        : isDarkMode
                                        ? "border-gray-500"
                                        : "border-gray-300"
                                      : isSelected
                                      ? "border-purple-500 bg-purple-500"
                                      : isDarkMode
                                      ? "border-gray-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {showFeedback && isCorrect && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                  {showFeedback && isSelected && !isCorrect && (
                                    <XCircle className="w-3 h-3 text-white" />
                                  )}
                                  {!showFeedback && isSelected && (
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={`text-sm ${
                                    isDarkMode
                                      ? "text-gray-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}. {option}
                                </span>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Feedback */}
                  {showMcqFeedback && (
                    <div
                      className={`p-4 rounded-lg mb-6 ${
                        mcqAnswers[
                          mcqPracticeQuestions[currentMcqQuestion].id
                        ] === mcqPracticeQuestions[currentMcqQuestion].correct
                          ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800"
                          : "bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {mcqAnswers[
                          mcqPracticeQuestions[currentMcqQuestion].id
                        ] ===
                        mcqPracticeQuestions[currentMcqQuestion].correct ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-sm text-green-600">
                              Correct!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="font-medium text-sm text-red-600">
                              Incorrect
                            </span>
                          </>
                        )}
                      </div>
                      <p
                        className={`text-xs ${
                          mcqAnswers[
                            mcqPracticeQuestions[currentMcqQuestion].id
                          ] === mcqPracticeQuestions[currentMcqQuestion].correct
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        <strong>Explanation:</strong>{" "}
                        {mcqPracticeQuestions[currentMcqQuestion].explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                      JS
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h1
                      className={`text-2xl font-bold mb-1 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      John Smith
                    </h1>
                    <p
                      className={`text-base mb-3 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Aspiring Civil Servant
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Member Since
                        </p>
                        <p
                          className={`font-semibold text-sm ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          January 2024
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Courses Completed
                        </p>
                        <p
                          className={`font-semibold text-sm ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          3 out of 6
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Average Score
                        </p>
                        <p
                          className={`font-semibold text-sm ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          85%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg`}
              >
                <h2
                  className={`text-lg font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value="John Smith"
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value="john.smith@email.com"
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      value="+977 9841234567"
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      value="Kathmandu, Nepal"
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                } shadow-lg`}
              >
                <h2
                  className={`text-lg font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-medium text-sm ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Dark Mode
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                        isDarkMode ? "bg-blue-600" : "bg-gray-200"
                                                                                                                  }`}
                                                                                                                >
                                                                                                                  <span
                                                                                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                                                                                      isDarkMode ? "translate-x-5" : "translate-x-1"
                                                                                                                    }`}
                                                                                                                  />
                                                                                                                </button>
                                                                                                              </div>

                                                                                                              <div className="flex items-center justify-between">
                                                                                                                <div>
                                                                                                                  <h3
                                                                                                                    className={`font-medium text-sm ${
                                                                                                                      isDarkMode ? "text-white" : "text-gray-900"
                                                                                                                    }`}
                                                                                                                  >
                                                                                                                    Email Notifications
                                                                                                                  </h3>
                                                                                                                  <p
                                                                                                                    className={`text-xs ${
                                                                                                                      isDarkMode ? "text-gray-400" : "text-gray-600"
                                                                                                                    }`}
                                                                                                                  >
                                                                                                                    Receive email notifications for updates
                                                                                                                  </p>
                                                                                                                </div>
                                                                                                                <button className="relative inline-flex h-5 w-10 items-center rounded-full bg-blue-600">
                                                                                                                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-5" />
                                                                                                                </button>
                                                                                                              </div>

                                                                                                              <div className="flex items-center justify-between">
                                                                                                                <div>
                                                                                                                  <h3
                                                                                                                    className={`font-medium text-sm ${
                                                                                                                      isDarkMode ? "text-white" : "text-gray-900"
                                                                                                                    }`}
                                                                                                                  >
                                                                                                                    Auto-save Progress
                                                                                                                  </h3>
                                                                                                                  <p
                                                                                                                    className={`text-xs ${
                                                                                                                      isDarkMode ? "text-gray-400" : "text-gray-600"
                                                                                                                    }`}
                                                                                                                  >
                                                                                                                    Automatically save your progress
                                                                                                                  </p>
                                                                                                                </div>
                                                                                                                <button className="relative inline-flex h-5 w-10 items-center rounded-full bg-blue-600">
                                                                                                                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-5" />
                                                                                                                </button>
                                                                                                              </div>
                                                                                                            </div>
                                                                                                          </div>

                                                                                                          {/* Account Settings */}
                                                                                                          <div
                                                                                                            className={`rounded-xl p-4 ${
                                                                                                              isDarkMode
                                                                                                                ? "bg-gray-800 border border-gray-700"
                                                                                                                : "bg-white border border-gray-100"
                                                                                                            } shadow-lg`}
                                                                                                          >
                                                                                                            <h2
                                                                                                              className={`text-lg font-bold mb-4 ${
                                                                                                                isDarkMode ? "text-white" : "text-gray-900"
                                                                                                              }`}
                                                                                                            >
                                                                                                              Account Settings
                                                                                                            </h2>
                                                                                                            <div className="space-y-3">
                                                                                                              <button className="w-full text-left p-3 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-sm">
                                                                                                                Change Password
                                                                                                              </button>
                                                                                                              <button className="w-full text-left p-3 rounded-lg border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-colors text-sm">
                                                                                                                Export Data
                                                                                                              </button>
                                                                                                              <button className="w-full text-left p-3 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors text-sm">
                                                                                                                Delete Account
                                                                                                              </button>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      )}

                                                                                                      {/* Study Material Tab */}
                                                                                                      {activeTab === "study-material" && (
                                                                                                        <div className="max-w-4xl mx-auto space-y-6">
                                                                                                          <div
                                                                                                            className={`rounded-xl p-6 ${
                                                                                                              isDarkMode
                                                                                                                ? "bg-gray-800 border border-gray-700"
                                                                                                                : "bg-white border border-gray-100"
                                                                                                            } shadow-lg`}
                                                                                                          >
                                                                                                            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Study Material</h2>
                                                                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                                                              {studyMaterials.map((material) => (
                                                                                                                <div
                                                                                                                  key={material.id}
                                                                                                                  className={`rounded-xl p-4 transition-transform hover:scale-[1.02] ${
                                                                                                                    isDarkMode
                                                                                                                      ? "bg-gray-700 border border-gray-600"
                                                                                                                      : "bg-gray-50 border border-gray-200"
                                                                                                                  } shadow`}
                                                                                                                >
                                                                                                                  <div className="flex items-center justify-between mb-2">
                                                                                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDarkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600"}`}>{material.category}</span>
                                                                                                                  </div>
                                                                                                                  <h3 className={`font-bold text-base mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{material.title}</h3>
                                                                                                                  <p className={`text-xs mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{material.description}</p>
                                                                                                                  <a
                                                                                                                    href="#"
                                                                                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs inline-block mt-2"
                                                                                                                    download={material.file}
                                                                                                                  >
                                                                                                                    Download
                                                                                                                  </a>
                                                                                                                </div>
                                                                                                              ))}
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      )}
                                                                                                    </main>
                                                                                                  </div>
                                                                                                </div>
                                                                                              );
                                                                                            };

                                                                                            export default StudentDashboard;

