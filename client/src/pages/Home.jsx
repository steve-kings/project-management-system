import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faUsers,
  faCalendarAlt,
  faChartBar,
  faBolt,
  faShieldAlt,
  faComments,
  faBell,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faTasks
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Manage Your Projects Efficiently",
      description: "Organize tasks, track progress, and collaborate with your team in real-time",
      image: "/pmsa1.jpg"
    },
    {
      title: "Team Collaboration Made Easy",
      description: "Work together seamlessly with real-time updates and instant notifications",
      image: "/pmsa2.jpg"
    },
    {
      title: "Track Progress with Analytics",
      description: "Get insights into your project performance with detailed analytics and reports",
      image: "/pmsa3.jpg"
    },
    {
      title: "Stay Organized with Calendar View",
      description: "Visualize deadlines and milestones in an intuitive calendar interface",
      image: "/pmsa4.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: faTasks,
      title: "Task Management",
      description: "Create, assign, and track tasks with priorities, due dates, and status updates.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: faUsers,
      title: "Team Collaboration",
      description: "Work together in real-time with your team across multiple workspaces and projects.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: faCalendarAlt,
      title: "Calendar View",
      description: "Visualize your project timeline and deadlines in an intuitive calendar interface.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: faChartBar,
      title: "Analytics Dashboard",
      description: "Track project progress with detailed analytics and performance metrics.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: faBolt,
      title: "Real-time Updates",
      description: "Get instant notifications when tasks are updated, created, or completed.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: faShieldAlt,
      title: "Secure Authentication",
      description: "Sign in securely with Google OAuth and manage team access with role-based permissions.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: faComments,
      title: "Task Comments",
      description: "Discuss tasks with your team using built-in commenting and collaboration features.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: faBell,
      title: "Email Invitations",
      description: "Invite team members via email and manage workspace memberships easily.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-900 sticky top-0 z-50 backdrop-blur-sm bg-black/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/Projecthub.png" 
                alt="ProjectHub Logo" 
                className="h-10 w-auto"
              />
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg shadow-orange-500/50"
            >
              <span>Get Started</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </nav>

      {/* Image Slider */}
      <section className="relative h-[600px] bg-black overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-emerald-900/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-10 text-gray-100 drop-shadow-lg">
                  {slide.description}
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 inline-flex items-center space-x-2 shadow-2xl shadow-orange-500/50"
                >
                  <span>Get Started Free</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-emerald-500/80 hover:bg-emerald-500 text-white p-3 rounded-full transition-all shadow-lg shadow-emerald-500/50"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-emerald-500/80 hover:bg-emerald-500 text-white p-3 rounded-full transition-all shadow-lg shadow-emerald-500/50"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-orange-500 w-10 shadow-lg shadow-orange-500/50' 
                  : 'bg-white/30 w-3 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-center border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/50">
                <FontAwesomeIcon icon={faCheckCircle} className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <span className="text-gray-300 text-lg">Projects Completed</span>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-center border border-orange-500/30 shadow-xl shadow-orange-500/10">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
                <FontAwesomeIcon icon={faUsers} className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <span className="text-gray-300 text-lg">Active Teams</span>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-center border border-blue-500/30 shadow-xl shadow-blue-500/10">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                <FontAwesomeIcon icon={faChartBar} className="text-white text-3xl" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">95%</div>
              <span className="text-gray-300 text-lg">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to help teams collaborate and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-white mb-10 drop-shadow-md">
            Join thousands of teams already using ProjectHub to manage their projects.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-black text-white rounded-lg text-xl font-bold hover:bg-gray-900 transition-all duration-200 inline-flex items-center space-x-2 shadow-2xl"
          >
            <span>Sign In with Google</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/Projecthub.png" 
                  alt="ProjectHub Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Streamline your workflow and deliver projects on time with powerful collaboration tools.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-500">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Task Management</li>
                <li className="hover:text-white transition-colors cursor-pointer">Team Collaboration</li>
                <li className="hover:text-white transition-colors cursor-pointer">Analytics Dashboard</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real-time Updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-emerald-500">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://kingscreation.co.ke" className="hover:text-orange-500 transition-colors">
                    kingscreation.co.ke
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/[PHONE_NUMBER]" className="hover:text-emerald-500 transition-colors">
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} <a href="https://kingscreation.co.ke" className="hover:text-orange-500 transition-colors font-semibold">kingscreation.co.ke</a>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
