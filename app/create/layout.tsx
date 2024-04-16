import SideNav from "@/components/SideNav";

export default function ReelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <>
  <div className="w-full h-full">
    <div className="flex-none lg:w-64 h-full border-r-2 border-r-gray-200 lg:fixed">
    <SideNav/>
    </div>
    <div className=" grow h-full border-r-2 lg:ml-64 p-6">
    {children}
    </div>
  </div>
  </>
  )
  ;
}