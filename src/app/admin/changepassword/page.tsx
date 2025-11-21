"use client";

import { useState } from "react";
import LayoutAdmin from "../LayoutAdmin";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match!");
      return;
    }

    setMessage("Password successfully changed!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <LayoutAdmin>
      {/* Centered layout and larger width */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-8 py-10">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl border border-gray-200">
          <h1 className="text-2xl font-semibold mb-10 text-gray-800 text-center">
            Change Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Old Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E40AF] text-white font-medium py-3 rounded-md hover:bg-blue-700 transition text-sm"
            >
              Save Changes
            </button>
          </form>

          {message && (
            <p
              className={`mt-8 text-center text-sm font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
}
