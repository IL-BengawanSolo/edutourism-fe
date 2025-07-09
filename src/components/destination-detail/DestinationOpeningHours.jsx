const DestinationOpeningHours = ({ opening_hours }) => (
  <div
    id="opening-hours"
    className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white p-8 lg:col-span-2 self-center"
  >
    <h1 className="text-2xl font-bold">Jam Buka</h1>
    <div className="mt-2 flex flex-col gap-2">
      {opening_hours.map((oh) => (
        <div
          key={oh.id}
          className={`flex items-center justify-between rounded-lg px-3 py-2 ${
            oh.is_closed
              ? "bg-neutral-200 opacity-60"
              : "bg-pr-blue-50"
          }`}
        >
          <span className={`font-semibold ${oh.is_closed ? "text-neutral-500" : "text-neutral-800"}`}>
            {oh.day_of_week}
          </span>
          {oh.is_closed ? (
            <span className="text-red-500 font-semibold">Tutup</span>
          ) : (
            <span className="text-primary font-semibold">
              {oh.open_time} - {oh.close_time}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);
export default DestinationOpeningHours;

