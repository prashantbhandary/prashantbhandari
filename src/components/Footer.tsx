export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 relative border-t border-indigo-500/20">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center">
          {/* Logo */}
          <div className="text-3xl font-bold flex items-center justify-center mb-4">
            <i className="fas fa-microchip mr-3 text-yellow-400"></i>
            <span>Prashant Bhandari</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Electronics Engineering Student | Robotics Enthusiast | Embedded Systems Developer
          </p>
          
          {/* Quote */}
          <div className="italic text-gray-400 text-lg mb-8 relative max-w-md mx-auto">
            <span className="text-3xl text-indigo-400 absolute -left-4 -top-2">&quot;</span>
            Stay curious. Keep building.
            <span className="text-3xl text-indigo-400 absolute -right-4 -bottom-6">&quot;</span>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              &copy; 2025 Prashant Bhandari. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
