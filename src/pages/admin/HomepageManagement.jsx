import AdminLayout from "../../components/admin/AdminLayout";

const HomepageManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Homepage Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage homepage content, hero sections, and featured items.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Homepage Management
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Homepage content management features will be available here.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomepageManagement;
