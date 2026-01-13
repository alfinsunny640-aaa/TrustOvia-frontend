import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold">{user?.user?.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{user?.user?.email}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
