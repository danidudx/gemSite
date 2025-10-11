import { useAuth } from "../../hooks/useAuth";

const UserProfile = () => {
  const { user, profileLoading } = useAuth();

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (profileLoading) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">User Profile</h3>
        <div className="text-sm text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">User Profile</h3>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Name:</strong>{" "}
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone || "N/A"}
        </p>
        <p>
          <strong>Firebase UID:</strong> {user.uid || user.firebaseUid || "N/A"}
        </p>
        <p>
          <strong>User ID:</strong> {user.id || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
