import Navbar from "./Navbar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="forest" className="min-h-screen">
        <Navbar />
        <div className="p-4">
            {children}
        </div>
    </div>
  )
}
export default Layout