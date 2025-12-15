const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-100">

      
      <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">HiddenInk</h1>

        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li><a href="/about" className="text-blue-600 font-semibold">About</a></li>
          <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>

      
      <section className="max-w-4xl mx-auto px-8 py-20">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg p-10 rounded-2xl">

          <h2 className="text-4xl font-bold mb-6 text-gray-900">About HiddenInk</h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            HiddenInk is a simple and secure application designed to help users 
            organize, store, and manage their notes with ease. Our interface is 
            crafted to be clean, minimal, and distraction-free for your best productivity.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            With modern web technologies powering the system, HiddenInk ensures smooth 
            performance, data security, and a seamless writing experience.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to empower individuals to capture thoughts, ideas, and 
            important information in a safe, organized, and effortless way — helping 
            you stay productive, creative, and focused.
          </p>

        </div>
      </section>
    </div>
  )
}

export default About
