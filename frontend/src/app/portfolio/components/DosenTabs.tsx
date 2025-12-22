"use client";

export default function DosenTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = [
    { id: "research", label: "Penelitian" },
    { id: "communityService", label: "Pengabdian" },
    { id: "publications", label: "Publikasi" },
    { id: "intellectualProperty", label: "HKI / Paten" },
  ];

  return (
    <div className="relative z-10 flex justify-center gap-3 py-4 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-2 rounded-full font-semibold ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
