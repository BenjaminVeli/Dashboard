import Sidebar from "../components/Sidebar";

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <h1 className="bg-slate-900 text-red-950">Settings</h1>
        </div>
      </main>
    </div>
  )
}

export default Settings