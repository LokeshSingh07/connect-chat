import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const actions = [
    {
      label: "Get Started for Free",
      link: "/",
      icon: <Sparkles className="mr-2 h-5 w-5" />,
      className:
        "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110 shadow-lg",
    },
    {
      label: "Schedule a Demo",
      link: "/",
      icon: null,
      className:
        "border border-green-300 text-green-700 hover:border-green-500 bg-white backdrop-blur-sm",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 pointer-events-none" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Glowing Border */}
        <div className="rounded-3xl p-1 bg-gradient-to-r from-green-300 via-emerald-300 to-lime-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center shadow-2xl">
            {/* Sparkles Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative h-12 w-12">
                <Sparkles className="h-12 w-12 text-green-500 animate-bounce relative z-10" />
                <div className="absolute inset-0 rounded-full bg-green-300/30 animate-pulse" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Supercharge Your Collaboration?
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands already transforming how they chat, share, and connect.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map(({ label, icon, className, link }, index) => (
                <Link
                  key={index}
                  to={link}
                  className={`text-lg px-8 py-4 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-105 ${className}`}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
