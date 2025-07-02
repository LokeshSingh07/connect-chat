
import { MessageCircle, Sparkles } from 'lucide-react';

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Security'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Contact', 'Privacy'],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-gradient-to-br from-green-50 via-white to-green-100 backdrop-blur-md bg-opacity-30">


      <div className="relative max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 animate-slide-in-left">
            <div className="flex items-center mb-4">
              <div className="relative">
                <MessageCircle className="h-8 w-8 text-green-600 animate-pulse" />
                <Sparkles className="h-4 w-4 text-green-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">Connect</span>
            </div>
            <p className="text-gray-600 max-w-md">
              The next generation chat platform that brings people together through seamless communication.
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((section, index) => (
            <div key={section.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="font-semibold text-gray-800 mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-500">
                {section.links.map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-green-600 transition-colors hover:scale-[1.02] inline-block">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 animate-fade-in">
          <p>&copy; 2024 Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
