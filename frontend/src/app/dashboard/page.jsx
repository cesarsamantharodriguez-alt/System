import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Content from "./content";


export default function Dashboard() {
  return (
    <main className="flex w-full h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-4 flex-1 overflow-auto bg-gray-50">
          <Content />
        </div>
      </div>
    </main>
  );
}

