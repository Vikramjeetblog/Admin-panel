import Card from "../components/ui/Card";
import { FaMusic, FaUniversity, FaFilm, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const brands = [
  {
    name: "The Chordifiers Studio",
    short: "TCS",
    icon: FaMusic,
    path: "/brands/tcs",
  },
  {
    name: "The Chordifiers Music Institute",
    short: "TCMI",
    icon: FaUniversity,
    path: "/brands/tcmi",
  },
  {
    name: "CC Visual",
    short: "Visual",
    icon: FaFilm,
    path: "/brands/visual",
  },
  {
    name: "CC Digital",
    short: "Digital",
    icon: FaGlobe,
    path: "/brands/digital",
  },
];

const Brands = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
          Brands
        </p>

        <h1 className="text-5xl italic tracking-tight mt-2">
          Overview
        </h1>
      </div>

      {/* Top Identity Card */}
      <Card className="p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
          Brand System
        </p>

        <h2 className="text-4xl italic mt-4">
          CC Media Network
        </h2>
      </Card>

      {/* Brand Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {brands.map((brand) => {
          const Icon = brand.icon;

          return (
            <Card
              key={brand.name}
              onClick={() => navigate(brand.path)}
              className="p-6 min-h-[160px] flex flex-col justify-between group cursor-pointer hover:border-black transition"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl border border-gray-200 bg-white">
                  <Icon size={18} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {brand.short}
                </span>
              </div>

              {/* Name */}
              <div className="mt-6">
                <h3 className="text-lg leading-snug text-gray-900 group-hover:underline">
                  {brand.name}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};

export default Brands;