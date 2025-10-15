import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon, color, link }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  if (link) {
    return (
      <Link to={link} className="block hover:opacity-90 transition-opacity">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    iconColorClasses[color] || iconColorClasses.blue
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {title}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">{value}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-gray-600">View details</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                iconColorClasses[color] || iconColorClasses.blue
              }`}
            >
              <span className="text-xl">{icon}</span>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
