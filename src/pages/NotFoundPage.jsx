import { Link } from 'react-router-dom'
import { Home, FileQuestion } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <FileQuestion size={48} className="text-gray-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Página não encontrada
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        <Home size={20} />
        Voltar ao início
      </Link>
    </div>
  )
}
