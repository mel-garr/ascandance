export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Ascendance</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Lightweight, beautiful EVs built for the real trips people take every day.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: <a href="mailto:hello@ascendance-ev.com" className="hover:text-white transition-colors">hello@ascendance-ev.com</a></li>
              <li>Phone: +212 XXXXXXXXXXXX</li>
              <li>HQ: Mohammed VI Polytechnic University</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Fast Facts</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>75% of trips are under 10km—designed for the real world.</li>
              <li>Battery costs trending to sub-$100/kWh keep EVs attainable.</li>
              <li>Performance configured to budgets from $5k–$30k+.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Ascendance. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
