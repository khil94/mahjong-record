import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function GlobalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={`h-full bg-bgPrimary text-text`}>
      <Navbar />
      <Sidebar />
      <div className="h-full flex justify-center items-center pl-24 sm:pl-0 sm:pt-24 ">
        {children}
      </div>
    </div>
  );
}
