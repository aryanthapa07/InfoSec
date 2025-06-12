import { useEffect, useState, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

const categories = {
  all: { icon: "📚", color: "indigo", label: "All Tips" },
  password: { icon: "🔑", color: "blue", label: "Password Security" },
  phishing: { icon: "🎣", color: "red", label: "Phishing Prevention" },
  privacy: { icon: "🔒", color: "green", label: "Privacy" },
  malware: { icon: "🦠", color: "purple", label: "Malware Protection" },
  general: { icon: "💡", color: "yellow", label: "General Security" },
};

const colorClasses = {
  blue: "bg-blue-600 hover:bg-blue-700",
  red: "bg-red-600 hover:bg-red-700",
  green: "bg-green-600 hover:bg-green-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  yellow: "bg-yellow-600 hover:bg-yellow-700",
  indigo: "bg-indigo-600 hover:bg-indigo-700",
};

export default function Tips() {
  const { markComplete } = useContext(ProgressContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedTip, setExpandedTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://infosec-h4db.onrender.com/api/tips")
      .then(r => r.json())
      .then(res => {
        setTips(res);
        markComplete("tips");
        setLoading(false);
      });
  }, []);

  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Information Security Best Practices
      </h2>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {Object.entries(categories).map(([key, { icon, color, label }]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
              selectedCategory === key
                ? `${colorClasses[color]} text-white`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredTips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No tips found matching your criteria.</p>
          </div>
        ) : (
          filteredTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedTip(expandedTip === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">
                      {categories[tip.category]?.icon || categories.general.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {categories[tip.category]?.label || "General Security"}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    {expandedTip === index ? "−" : "+"}
                  </button>
                </div>
                {expandedTip === index && (
                  <div className="mt-4 text-gray-600 space-y-4">
                    <p>{tip.content}</p>
                    {tip.example && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-700 mb-2">Example:</p>
                        <p className="text-gray-600">{tip.example}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Remember: Security is a continuous process, not a one-time task.
          Stay vigilant and keep learning!
        </p>
      </div>
    </div>
  );
}
