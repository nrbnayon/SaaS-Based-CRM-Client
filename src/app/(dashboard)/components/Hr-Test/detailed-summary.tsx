import { summaryData } from "@/data/hrTestData";

export default function DetailedSummary() {
  return (
    <div className="bg-background dark:bg-dark-primary p-8 rounded-3xl max-w-4xl mx-auto">
      <h1 className="text-foreground text-3xl font-bold mb-8">
        Detailed Summary
      </h1>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-3 gap-8 mb-6">
          <div className="text-foreground text-xl font-semibold">
            Categories
          </div>
          <div className="text-foreground text-xl font-semibold">Status</div>
          <div className="text-foreground text-xl font-semibold">Frequency</div>
        </div>

        {/* Data Rows */}
        {summaryData.map((item, index) => (
          <div key={item.id}>
            <div className="grid grid-cols-3 gap-8 py-4 items-center">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
                <span className="text-foreground text-lg font-medium">
                  {item.pair}
                </span>
              </div>
              <div className={`text-lg font-medium ${item.statusColor}`}>
                {item.status}
              </div>
              <div className={`text-lg font-medium ${item.statusColor}`}>
                {item.frequency}
              </div>
            </div>
            {index < summaryData.length - 1 && (
              <div className="border-b border-gray-600/30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
