import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DynamicForm } from './components/DinamicForm.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DynamicForm />} />
      </Routes>
    </BrowserRouter>
  )
}
