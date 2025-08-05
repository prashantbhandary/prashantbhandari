export default function Blog() {
  const blogPosts = [
    {
      title: 'Getting Started with ESP32 Development',
      excerpt: 'A comprehensive guide to ESP32 programming and IoT development for beginners.',
      date: 'January 15, 2025',
      readTime: '5 min read',
      icon: 'fas fa-microchip',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'PCB Design Best Practices',
      excerpt: 'Essential tips and techniques for creating professional PCB layouts and avoiding common mistakes.',
      date: 'December 28, 2024',
      readTime: '8 min read',
      icon: 'fas fa-draw-polygon',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Robotics Competition Insights',
      excerpt: 'Lessons learned from participating in robotics competitions and building successful robots.',
      date: 'December 15, 2024',
      readTime: '6 min read',
      icon: 'fas fa-robot',
      gradient: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <section id="blog" className="py-24 relative bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sharing knowledge and insights about electronics, robotics, and embedded systems development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                <i className={`${post.icon} text-6xl text-white/90 group-hover:scale-110 transition-transform duration-300`}></i>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-cyan-400 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                  Read More
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.linkedin.com/in/prashantbdri/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  )
}
