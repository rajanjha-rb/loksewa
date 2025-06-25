import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BookOpen, ClipboardList, UserCircle2, Bell } from "lucide-react";
import { FaQuoteLeft, FaChalkboardTeacher } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const coursesData = [
  {
    title: "Kharidar",
    description:
      "Well-structured syllabus, updated materials, and previous-year questions.",
    src: "/kharidar.png",
  },
  {
    title: "Nayab Subba",
    description:
      "Comprehensive study guides and practical exam techniques for success.",
    src: "/subba.png",
  },
  {
    title: "Sakha Adhikrit",
    description:
      "In-depth lessons and mock tests designed by experts for top results.",
    src: "/adhikrit.png",
  },
];

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "Mock Tests",
      "MCQ Practice",
      "Live Loksewa Updates",
      "Personal Dashboard",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 w-full">
        <div className="w-full flex flex-col items-center text-center space-y-6">
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Prepare Smarter for{" "}
            <span className="text-blue-500">Loksewa Exams</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            <span className="text-blue-400 font-semibold">We provide </span>
            <span className="text-white font-bold">
              {text}
              <Cursor cursorStyle="|" />
            </span>
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-md font-semibold text-white inline-flex items-center gap-2"
            >
              Get Started <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Our Courses
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {coursesData.map((course, index) => (
              <motion.div
                key={course.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={course.src}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center"
                >
                  Learn More <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Features
          </h2>
          <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
            <Feature icon={<ClipboardList size={28} />} title="Mock Tests" />
            <Feature icon={<BookOpen size={28} />} title="MCQ Practice" />
            <Feature icon={<UserCircle2 size={28} />} title="Dashboard" />
            <Feature icon={<Bell size={28} />} title="Live Notices" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white px-4">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-lg">
            Loksewa Academy is Nepal’s modern solution for Loksewa preparation.
            We offer intuitive learning experiences, real-exam simulations, and
            expert insights to guide students toward success.
          </p>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-100 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md inline-block"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      show: { opacity: 1, scale: 1 },
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center space-y-3 hover:shadow-md transition"
  >
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">{icon}</div>
    <h4 className="text-gray-800 font-semibold text-base">{title}</h4>
  </motion.div>
);

export default Hero;
