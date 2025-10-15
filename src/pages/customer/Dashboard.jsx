import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="content-with-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <div className="text-center py-12">
            <p className="text-gray-500">Welcome to your dashboard</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
