import AdminLayout from "../../components/admin/AdminLayout";

const InquiryManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inquiry Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer inquiries and support requests.
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No inquiries yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Customer inquiries will appear here when they are submitted.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InquiryManagement;
