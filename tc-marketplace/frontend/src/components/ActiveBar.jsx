
export default function ActiveBar({ tabs, activeTab, setActiveTab, header }) {
    return (
        <div className="bg-slate-100 text-green-900 flex flex-col justify-center mb-6">

            {header && <h2 className="text-2xl font-bold mb-6 text-center">{header}</h2>}
            <div className="flex gap-4 justify-center mb-4">
            {
                tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-3 rounded-lg text-left ${
                            activeTab === tab.id ? "bg-gray-300" : "hover:bg-gray-400"
                        }`}
                        >
                        {tab.label}
                    </button>
                ))
            }
            </div>
        </div>
    )

}