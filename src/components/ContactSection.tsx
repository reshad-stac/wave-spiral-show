
import { motion } from 'framer-motion';
import { FaLinkedin, FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
        setScrollYProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formOpacity = Math.max(0, 1 - scrollYProgress * 3);
  const footerOpacity = Math.max(0, (scrollYProgress - 0.33) * 3);
  
  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/jahidul-hassan-reshad-057513256/' },
    { icon: FaFacebook, href: 'https://www.facebook.com/jojo.reshad/' },
    { icon: FaGithub, href: 'https://github.com/reshadMajumder/' },
  ];

  const emailLinks = [
    { email: 'hassanjahidul365@gmail.com' },
    { email: 'reshad.ceo@byteblooper.com' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative h-[200vh] text-white font-sans"
      style={{
        backgroundImage: "url('https://i.gifer.com/3YDc.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />

        {/* Contact Form */}
        <motion.div 
          className="relative max-w-2xl w-full mx-auto z-10 text-center"
          style={{ opacity: formOpacity }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-wider">GET IN TOUCH</h2>
          <div className="p-8 rounded-xl shadow-2xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 text-left">Your Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 rounded-none shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-transparent focus:border-indigo-500 sm:text-sm transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">Your Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 rounded-none shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-transparent focus:border-indigo-500 sm:text-sm transition-colors" placeholder="john.doe@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 text-left">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full bg-transparent border-b-2 border-gray-500 rounded-none shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-transparent focus:border-indigo-500 sm:text-sm transition-colors" placeholder="Your message here..." />
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">SEND MESSAGE</button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Footer Content */}
        <motion.div 
          className="absolute z-20 text-center"
          style={{ opacity: footerOpacity }}
        >
           <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider">Connect With Me</h2>
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform">
                <link.icon size={32} />
              </a>
            ))}
          </div>
          <div className="mb-8 space-y-2">
            {emailLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-gray-400">
                <FaEnvelope />
                <a href={`mailto:${link.email}`} className="hover:text-white transition-colors">{link.email}</a>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-6 mt-8 w-full max-w-md mx-auto">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jahidul Hassan Reshad. All Rights Reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
