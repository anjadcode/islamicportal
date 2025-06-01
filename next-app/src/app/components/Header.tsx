export default function Header() {
  return (
    <header className="bg-white shadow-md py-3 px-6 fixed top-0 w-full">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo / Branding */}
        <h1 className="text-lg font-semibold text-islamic-green-dark">Islamic Portal</h1>

        {/* Navigation Links */}
        <nav className="space-x-4 text-sm font-medium text-gray-600">
          <a href="#prayer-times" className="hover:text-islamic-green-dark">Contact</a>
          <a href="#calendar" className="hover:text-islamic-green-dark">About</a>
        </nav>
      </div>
    </header>
  );
}
