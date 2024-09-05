import Fetcher from "./Fetcher";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function GlobalLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <Fetcher />
      <div className={`h-full bg-bgPrimary text-text`}>
        <Navbar />
        <Sidebar />
        <div className="[&>div]:bg-bgPrimary h-full flex justify-center items-center pl-24 sm:pl-0 ">
          {children}
        </div>
      </div>
    </>
  );
}
