"use client";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function DosenTabs({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: "research", label: "Penelitian" },
    { id: "communityService", label: "Pengabdian" },
    { id: "publications", label: "Publikasi" },
    { id: "intellectualProperty", label: "HKI / Paten" },
  ];

  return (
    <div className="relative z-10 flex flex-wrap justify-center gap-3 py-4 bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white shadow-md scale-[1.02]"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
