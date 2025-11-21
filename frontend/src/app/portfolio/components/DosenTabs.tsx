"use client";

export default function DosenTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  // ✅ Nama tab sekarang disesuaikan dengan key di DosenCard
  const tabs = [
    { id: "research", label: "Penelitian" },
    { id: "communityService", label: "Pengabdian Masyarakat" },
    { id: "publications", label: "Publikasi Karya" },
    { id: "intellectualProperty", label: "HKI / Paten" },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-3 py-4 border-t border-gray-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
            ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
}
