export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-lg text-white">Glenda Timola</p>
            <p className="text-sm mt-1">Real Estate Professional</p>
          </div>
          <p className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Glenda Timola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
