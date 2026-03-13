import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transacoes" element={<TransactionsPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App
