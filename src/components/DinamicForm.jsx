import { useState, useEffect } from 'react'
import { renderForm } from '../utils/RenderForm.jsx'
import formData from '../../forms.json'
import '../../style.css'
export function DynamicForm() {
  const [formFields, setFormFields] = useState([])
  const [saveData, setSaveData] = useState(null)
  const [obtainedData, setObtainedData] = useState(null)
  const [deleteData, setDeleteData] = useState(false)

  const saveDataFetch = (form) => {
    fetch('http://localhost:3000/form/create-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((data) => setSaveData(data))
      .catch((error) => console.log(error.message))
  }

  const handleSaveData = () => {
    saveDataFetch(formData)
  }

  const getDataFetch = () => {
    fetch('http://localhost:3000/form/read-form')
      .then((response) => {
        if (!response.ok) {
          console.log('Error al obtener los datos')
        }
        return response.json()
      })
      .then((data) => setObtainedData(data))
      .catch((error) => console.log(error.message))
  }

  const deleteDataFetch = (id) => {
    setDeleteData(false)
    fetch(`http://localhost:3000/form/delete-form/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          console.log('Error al eliminar')
        }
        if (response.status === 204) {
          setDeleteData(true)
        }
      })
      .catch((error) => console.log(error.message))
  }

  const handleDelete = (id) => {
    deleteDataFetch(id)
  }

  // =========================================
  useEffect(() => {
    getDataFetch()
  }, [saveData, deleteData])

  // =========================================
  useEffect(() => {
    const fields = formData?.data?.map((data) => data.section) ?? [] // extrallendo los campos del json si existen y su no
    setFormFields(fields)
  }, [formData]) // se ejecuta cada vez que el json cambia

  return (
    <div className='container'>
      <div className='box'>
        {formFields.map((section, index) => renderForm(section.fields, index))}
        <button onClick={handleSaveData}> guardar </button>
      </div>
      <div className='box'>
        {obtainedData?.forms?.map((form) => (
          <div key={form._id} className='form'>
            {form?.data?.map((data, index) =>
              renderForm(data.section.fields, index)
            )}
            <button onClick={() => handleDelete(form._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
