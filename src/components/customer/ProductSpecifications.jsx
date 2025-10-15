import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductSpecifications({ specifications = {} }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const specItems = [
    { label: "Color", value: specifications.color },
    {
      label: "Carat Weight",
      value: specifications.carat ? `${specifications.carat}ct` : null,
    },
    { label: "Cut", value: specifications.cut },
    { label: "Clarity", value: specifications.clarity },
    { label: "Shape", value: specifications.shape },
    { label: "Origin", value: specifications.origin },
    { label: "Certification", value: specifications.certification },
  ].filter((item) => item.value);

  if (specItems.length === 0) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-medium text-gray-600">
                  {item.label}:
                </span>
                <span className="text-sm text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
