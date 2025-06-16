import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function scrollToWithOffset(id, offset = -60) {
  const target = document.getElementById(id);
  if (target) {
    const y = target.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const DestinationTabs = () => (
  <div className="sticky top-0 z-10">
    <div className="rounded-none bg-white shadow-[0px_4px_10px_-4px_rgba(0,0,0,0.16)] sm:rounded-b-2xl">
      <Tabs defaultValue="general-info" className="w-full">
        <TabsList className="flex w-full flex-wrap items-center gap-1 rounded-none bg-white p-2 sm:rounded-b-2xl">
          <TabsTrigger
            value="general-info"
            className="min-w-[90px] flex-1 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToWithOffset("general-info", -72);
            }}
          >
            Info Umum
          </TabsTrigger>
          <TabsTrigger
            value="facilities"
            className="min-w-[90px] flex-1 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToWithOffset("facilities");
            }}
          >
            Fasilitas
          </TabsTrigger>
          <TabsTrigger
            value="location"
            className="min-w-[90px] flex-1 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToWithOffset("location");
            }}
          >
            Lokasi
          </TabsTrigger>
          <TabsTrigger
            value="opening-hours"
            className="min-w-[90px] flex-1 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToWithOffset("opening-hours");
            }}
          >
            Jam Buka
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="min-w-[90px] flex-1 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault();
              scrollToWithOffset("gallery");
            }}
          >
            Galeri
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
);

export default DestinationTabs;
