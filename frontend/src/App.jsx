import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = () => {
    fetch('/api/items/')
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(res => res.json())
      .then(data => {
        setItems([data, ...items])
        setNewItem({ name: '', description: '' })
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container">
      <h1>VPS Deployment Test - Items API</h1>

      <div className="card">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <textarea
            placeholder="Description (optional)"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            style={{ padding: '8px' }}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="card">
        <h2>Items List</h2>
        {loading ? <p>Loading...</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map(item => (
              <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <strong>{item.name}</strong>
                {item.description && <p style={{ margin: '5px 0 0', color: '#666' }}>{item.description}</p>}
              </li>
            ))}
            {items.length === 0 && <p>No items found.</p>}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
