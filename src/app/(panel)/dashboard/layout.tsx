import Sidebar from "./_components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  )
}
