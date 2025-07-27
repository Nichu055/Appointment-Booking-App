const HomePage = () => (
  <main className="container mx-auto px-4 py-16 flex flex-col items-center">
    <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
      Welcome to Appointment Booking App
    </h1>
    <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
      Effortlessly schedule, manage, and track appointments with our modern, user-friendly platform.
      Streamline your booking process and provide a seamless experience for your clients.
    </p>
    <a
      href="#"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Get Started
    </a>
    <section className="mt-16 grid md:grid-cols-3 gap-8 w-full max-w-4xl">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Easy Scheduling</h2>
        <p className="text-gray-600">Book appointments in just a few clicks with our intuitive interface.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Automated Reminders</h2>
        <p className="text-gray-600">Reduce no-shows with automatic email and SMS reminders.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Clients</h2>
        <p className="text-gray-600">Keep track of client details and appointment history easily.</p>
      </div>
    </section>
  </main>
);

export default HomePage;