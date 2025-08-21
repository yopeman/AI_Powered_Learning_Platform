import /* React, */ { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Brain,
  Users,
  BookOpen,
  Award,
  Smartphone,
  Monitor,
  Database,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Shield,
  TrendingUp,
  Code,
  Cpu,
  Cloud,
  MessageCircle,
  Video,
  Download,
  Mail,
  Lock
} from 'lucide-react';
import "./Components.css";

export default function Components() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Header */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white shadow-md py-0'
                : 'bg-transparent py-2'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AiPLP
              </span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
                <a href="#roles" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">User Roles</a>
                <a href="#technology" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Technology</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
                <a href="/login" style={{ textDecoration: 'none' }}>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
                    Get Started
                  </button>
                </a>
              </nav>

              <button className="md:hidden z-50" onClick={toggleMenu}>
                {isMenuOpen ?
                    <X className="h-6 w-6 text-gray-800" /> :
                    <Menu className="h-6 w-6 text-gray-800" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
                <div className="px-6 py-8 space-y-6 flex flex-col h-full">
                  <div className="space-y-4">
                    <a href="#features" className="block text-gray-800 hover:text-blue-600 text-lg py-2" onClick={toggleMenu}>Features</a>
                    <a href="#roles" className="block text-gray-800 hover:text-blue-600 text-lg py-2" onClick={toggleMenu}>User Roles</a>
                    <a href="#technology" className="block text-gray-800 hover:text-blue-600 text-lg py-2" onClick={toggleMenu}>Technology</a>
                    <a href="#testimonials" className="block text-gray-800 hover:text-blue-600 text-lg py-2" onClick={toggleMenu}>Testimonials</a>
                    <a href="#contact" className="block text-gray-800 hover:text-blue-600 text-lg py-2" onClick={toggleMenu}>Contact</a>
                  </div>
                  <div className="mt-auto pb-8">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
          )}
        </header>

        {/* Enhanced Hero Section */}
        <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">AI-Powered Learning</span>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Platform
              </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transform education with our comprehensive platform that integrates AI technology,
                multi-role management, and cross-platform accessibility for the ultimate learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center">
                  Start Learning Today
                  <ArrowRight className="inline-block ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Role System</h3>
                <p className="text-gray-600">Administrators, assistants, and students with tailored experiences</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-600">Intelligent content generation and personalized learning paths</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
                <p className="text-gray-600">Seamless experience across mobile and web applications</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 bg-gray-50 relative">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Learning Ecosystem
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create, manage, and deliver exceptional educational experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, color: 'blue', title: 'Interactive Learning', description: 'AI-powered Q&A system with real-time responses and personalized tutoring' },
                { icon: Award, color: 'purple', title: 'Certification System', description: 'AI-generated quizzes and downloadable certificates for course completion' },
                { icon: Shield, color: 'green', title: 'Secure Payments', description: 'Integrated payment processing with Chapa gateway for premium content' },
                { icon: TrendingUp, color: 'orange', title: 'Progress Tracking', description: 'Comprehensive analytics and progress monitoring for all users' },
                { icon: Smartphone, color: 'red', title: 'Mobile First', description: 'Native mobile apps for iOS and Android with offline capabilities' },
                { icon: Zap, color: 'indigo', title: 'Real-time Learning', description: 'Instant AI responses and dynamic content adaptation based on learning patterns' }
              ].map((feature, index) => (
                  <div
                      key={index}
                      className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
                  >
                    <div className={`bg-${feature.color}-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-${feature.color}-600`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}-600 transition-colors duration-300 group-hover:text-white`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced User Roles Section */}
        <section id="roles" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tailored for Every User
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three distinct experiences designed for administrators, teaching assistants, and students
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Students',
                  subtitle: 'Mobile-first learning experience',
                  icon: Smartphone,
                  gradient: 'from-blue-500 to-blue-600',
                  features: [
                    'Cross-platform mobile app (iOS & Android)',
                    'AI-powered interactive learning',
                    'Quiz system with certificates',
                    'Offline content caching',
                    'Progress tracking & analytics'
                  ]
                },
                {
                  title: 'Assistants',
                  subtitle: 'Content creation & management',
                  icon: Users,
                  gradient: 'from-purple-500 to-purple-600',
                  features: [
                    'Course & chapter creation tools',
                    'Field-specific content management',
                    'Curriculum structuring by semester',
                    'AI-assisted content generation',
                    'Student progress monitoring'
                  ]
                },
                {
                  title: 'Administrators',
                  subtitle: 'Complete platform oversight',
                  icon: Monitor,
                  gradient: 'from-green-500 to-green-600',
                  features: [
                    'User management & role assignment',
                    'Comprehensive analytics dashboard',
                    'Payment & transaction monitoring',
                    'Content moderation & approval',
                    'System configuration & settings'
                  ]
                }
              ].map((role, index) => (
                  <div
                      key={index}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-3"
                  >
                    <div className={`bg-gradient-to-r ${role.gradient} p-8 text-white`}>
                      <role.icon className="h-12 w-12 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                      <p className="opacity-90">{role.subtitle}</p>
                    </div>
                    <div className="p-8">
                      <ul className="space-y-4">
                        {role.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Technology Stack */}
        <section id="technology" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powered by Modern Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with cutting-edge technologies for scalability, performance, and reliability
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Code, name: 'React Native', color: 'blue' },
                { icon: Monitor, name: 'React', color: 'purple' },
                { icon: Database, name: 'Node.js', color: 'green' },
                { icon: Brain, name: 'OpenAI', color: 'orange' },
                { icon: Cpu, name: 'MySQL', color: 'red' },
                { icon: Cloud, name: 'Express', color: 'indigo' }
              ].map((tech, index) => (
                  <div
                      key={index}
                      className="text-center group transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`bg-gray-100 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-${tech.color}-100 group-hover:shadow-lg`}>
                      <tech.icon className={`h-10 w-10 text-gray-600 transition-colors duration-300 group-hover:text-${tech.color}-600`} />
                    </div>
                    <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied educators and students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: '"The AI-powered learning experience is incredible. It\'s like having a personal tutor available 24/7."',
                  name: 'Alex Smith',
                  role: 'Computer Science Student',
                  initials: 'AS',
                  color: 'blue'
                },
                {
                  quote: '"As a teaching assistant, the content creation tools have revolutionized how I develop courses."',
                  name: 'Maria Johnson',
                  role: 'Teaching Assistant',
                  initials: 'MJ',
                  color: 'purple'
                },
                {
                  quote: '"The comprehensive analytics and user management features make administration effortless."',
                  name: 'David Wilson',
                  role: 'Platform Administrator',
                  initials: 'DW',
                  color: 'green'
                }
              ].map((testimonial, index) => (
                  <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic relative pl-6">
                      <span className="absolute left-0 top-0 text-5xl text-gray-200 font-serif leading-none">"</span>
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <div className={`bg-${testimonial.color}-100 w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                        <span className={`text-${testimonial.color}-600 font-semibold`}>{testimonial.initials}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-soft-light"></div>
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-white rounded-full mix-blend-soft-light"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of educators and students already experiencing the future of learning with AiPLP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <Video className="h-5 w-5 mr-2" />
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer id="contact" className="bg-gray-900 text-white pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">AiPLP</span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                  Transforming education with AI-powered learning experiences.
                  Join the future of personalized education today.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-blue-600 transition-colors">
                    <Globe className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-purple-600 transition-colors">
                    <Smartphone className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-green-600 transition-colors">
                    <Monitor className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Resources
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Community
                </h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Forums</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contributors</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>support@aiplp.com</span>
                  </li>
                  <li className="flex items-start">
                    <Smartphone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Security Policy</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 AiPLP. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">License</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Download Button */}
        <a
            href="https://expo.dev/artifacts/eas/5AqpVyX5EaUgg9bar9PtYj.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center"
        >
          <Download className="h-6 w-6" />
          <span className="ml-2 font-medium hidden sm:inline">Get Mobile App</span>
        </a>
      </div>
  );
}