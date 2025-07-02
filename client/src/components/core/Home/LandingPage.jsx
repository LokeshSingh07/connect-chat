import { Star, Sparkles, MessageCircle, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'


export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-green-50 via-green-100 to-green-100">
      <div className="mx-auto px-4 text-center max-w-4xl">
        {/* Stars Animation */}
        <div className="flex justify-center mb-6 relative">
          <Star className="h-6 w-6 text-green-500 animate-bounce absolute -top-2 -left-2" />
          <Star className="h-4 w-4 text-green-500 animate-bounce absolute top-0 right-8" style={{ animationDelay: '0.4s' }} />
          <Star className="h-5 w-5 text-green-500 animate-bounce absolute -bottom-2 right-2" style={{ animationDelay: '0.8s' }} />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-8xl font-bold text-gray-800 mb-4">
          Connect, Chat, and
          <span className="text-green-600 drop-shadow-lg"> Collaborate</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Experience seamless communication with our next-generation chat platform. Connect with teams, friends, and communities like never before.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link 
            to={'/'}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg flex items-center gap-2 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Start Chatting Now
          </Link>
          <button className="text-green-600 font-medium border border-green-400 px-6 py-3 rounded-lg backdrop-blur-md bg-white/50 shadow-sm hover:scale-105 transition-transform">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Floating Chat Bubble - Left */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white text-gray-800 text-sm px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg backdrop-blur-md bg-opacity-80 max-w-xs">
          Hey! How's the new project going? 🚀
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Floating Chat Bubble - Right */}
      <div className="absolute top-1/3 right-10 -translate-y-1/2 hidden lg:block animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="relative p-4 text-sm bg-white text-green-900 rounded-2xl rounded-br-sm shadow-lg max-w-xs backdrop-blur-md bg-opacity-80 border border-green-300 animate-bounce">
          Amazing! The team collaboration is so smooth now ✨
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-24 right-1/4 animate-float">
        <MessageCircle className="h-8 w-8 text-green-300" />
      </div>
      <div className="absolute bottom-24 left-1/3 animate-float">
        <Users className="h-6 w-6 text-green-200" />
      </div>
    </section>
  )
}
