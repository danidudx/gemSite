import { useState, useEffect } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";

export default function FilterSidebar({
  filters,
  onFilterChange,
  searchSuggestions = {},
  isOpen,
  onToggle,
}) {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    category: true,
    price: true,
    specifications: true,
    availability: true,
    rarity: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  const clearAllFilters = () => {
    onFilterChange("clearAll", null);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== null && value !== undefined
  );

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3"
      >
        <span>{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full overflow-y-auto transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter size={24} className="mr-2" />
            Filters
          </h2>
          {isOpen && (
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="w-full mb-6 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            Clear All Filters
          </button>
        )}

        <FilterSection title="Product Type" sectionKey="type">
          <div className="space-y-2">
            {["gem", "jewelry"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.type === type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Category" sectionKey="category">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {searchSuggestions.categories?.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) =>
                    handleFilterChange(
                      "category",
                      e.target.checked ? category : ""
                    )
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                placeholder="10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Specifications" sectionKey="specifications">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {searchSuggestions.colors
                  ?.filter((color) => color)
                  .map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        value={color}
                        checked={filters.color === color}
                        onChange={(e) =>
                          handleFilterChange(
                            "color",
                            e.target.checked ? color : ""
                          )
                        }
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carat Weight
              </label>
              <input
                type="number"
                step="0.1"
                value={filters.carat || ""}
                onChange={(e) => handleFilterChange("carat", e.target.value)}
                placeholder="e.g. 1.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cut
              </label>
              <select
                value={filters.cut || ""}
                onChange={(e) => handleFilterChange("cut", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Cut</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clarity
              </label>
              <select
                value={filters.clarity || ""}
                onChange={(e) => handleFilterChange("clarity", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Clarity</option>
                <option value="FL">FL (Flawless)</option>
                <option value="IF">IF (Internally Flawless)</option>
                <option value="VVS1">VVS1</option>
                <option value="VVS2">VVS2</option>
                <option value="VS1">VS1</option>
                <option value="VS2">VS2</option>
                <option value="SI1">SI1</option>
                <option value="SI2">SI2</option>
                <option value="I1">I1</option>
                <option value="I2">I2</option>
                <option value="I3">I3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shape
              </label>
              <select
                value={filters.shape || ""}
                onChange={(e) => handleFilterChange("shape", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Shape</option>
                <option value="Round">Round</option>
                <option value="Princess">Princess</option>
                <option value="Emerald">Emerald</option>
                <option value="Oval">Oval</option>
                <option value="Marquise">Marquise</option>
                <option value="Pear">Pear</option>
                <option value="Heart">Heart</option>
                <option value="Cushion">Cushion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <input
                type="text"
                value={filters.origin || ""}
                onChange={(e) => handleFilterChange("origin", e.target.value)}
                placeholder="e.g. South Africa, Brazil"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification
              </label>
              <select
                value={filters.certification || ""}
                onChange={(e) =>
                  handleFilterChange("certification", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Certification</option>
                <option value="GIA">GIA</option>
                <option value="AGL">AGL</option>
                <option value="EGL">EGL</option>
                <option value="IGI">IGI</option>
                <option value="HRD">HRD</option>
              </select>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Availability" sectionKey="availability">
          <div className="space-y-2">
            {["in_stock", "sold"].map((availability) => (
              <label key={availability} className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value={availability}
                  checked={filters.availability === availability}
                  onChange={(e) =>
                    handleFilterChange("availability", e.target.value)
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">
                  {availability.replace("_", " ")}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Rarity" sectionKey="rarity">
          <div className="space-y-2">
            {["Common", "Premium", "Rare", "Very Rare"].map((rarity) => (
              <label key={rarity} className="flex items-center">
                <input
                  type="checkbox"
                  value={rarity}
                  checked={filters.rarity === rarity}
                  onChange={(e) =>
                    handleFilterChange("rarity", e.target.checked ? rarity : "")
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span>{rarity}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
