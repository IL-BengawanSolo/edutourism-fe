const DestinationOpeningHours = ({ opening_hours }) => (
  <div
    id="opening-hours"
    className="col-span-1 flex flex-col gap-4 rounded-2xl bg-white p-8 lg:col-span-2"
  >
    <h1 className="text-2xl font-bold">Jam Buka</h1>
    <div className="mt-2 flex flex-col gap-2">
      {Object.entries(opening_hours).map(([day, time]) => (
        <div
          key={day}
          className="bg-pr-blue-50 flex items-center justify-between rounded-lg px-3 py-2"
        >
          <span className="font-semibold text-neutral-800">{day}</span>
          <span className="text-primary font-semibold">{time}</span>
        </div>
      ))}
    </div>
  </div>
);
export default DestinationOpeningHours;