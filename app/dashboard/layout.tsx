import Sidebar from './components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0e8' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', paddingTop: 0 }} className="dashboard-main">
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-main { padding-top: 49px !important; }
        }
      `}</style>
    </div>
  )
}
