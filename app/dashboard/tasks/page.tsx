'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Task = {
  id: string
  created_at: string
  title: string
  description: string
  assigned_to: string
  due_date: string
  priority: string
  status: string
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', due_date: '', priority: 'medium', assigned_to: '' })

  useEffect(() => { fetchTasks() }, [])

  async function fetchTasks() {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
    setTasks(data || [])
    setLoading(false)
  }

  async function addTask(e: React.FormEvent) {
  e.preventDefault()
  const taskData = {
    ...form,
    due_date: form.due_date || null,
    assigned_to: form.assigned_to || null,
  }
  const { error } = await supabase.from('tasks').insert([taskData])
  if (error) {
    alert('Error: ' + error.message)
  } else {
    setForm({ title: '', description: '', due_date: '', priority: 'medium', assigned_to: '' })
    setShowForm(false)
    fetchTasks()
  }
}

  async function toggleStatus(task: Task) {
    const newStatus = task.status === 'todo' ? 'done' : 'todo'
    await supabase.from('tasks').update({ status: newStatus }).eq('id', task.id)
    fetchTasks()
  }

  async function deleteTask(id: string) {
    await supabase.from('tasks').delete().eq('id', id)
    fetchTasks()
  }

  const priorityColor: Record<string, { bg: string, color: string }> = {
    high: { bg: '#f0e4e4', color: '#7a2a2a' },
    medium: { bg: '#f0e8d4', color: '#7a5a1a' },
    low: { bg: '#e8f0d4', color: '#2a5a1a' },
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Task Board</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{tasks.filter(t => t.status === 'todo').length} open · {tasks.filter(t => t.status === 'done').length} completed</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>
          + New Task
        </button>
      </div>

      {showForm && (
        <form onSubmit={addTask} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '16px', fontWeight: 'bold' }}>New Task</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Task Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="What needs to be done?" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Assign To</label>
              <input value={form.assigned_to} onChange={e => setForm({...form, assigned_to: e.target.value})} placeholder="Member name" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Due Date</label>
              <input type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Priority</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Additional details..." rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Add Task</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#fff', color: '#5a5040', border: '1px solid #ddd8cc', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p>
      ) : tasks.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No tasks yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Click New Task to get started.</p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Open</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            {tasks.filter(t => t.status === 'todo').map(task => (
              <div key={task.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <input type="checkbox" checked={false} onChange={() => toggleStatus(task)} style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#4a7c3f' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', margin: 0 }}>{task.title}</p>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '3px', fontFamily: 'sans-serif', background: priorityColor[task.priority]?.bg, color: priorityColor[task.priority]?.color }}>{task.priority}</span>
                  </div>
                  {task.description && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '4px' }}>{task.description}</p>}
                  <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>
                    {task.assigned_to && `Assigned to ${task.assigned_to}`}
                    {task.assigned_to && task.due_date && ' · '}
                    {task.due_date && `Due ${new Date(task.due_date).toLocaleDateString()}`}
                  </p>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}>×</button>
              </div>
            ))}
          </div>

          {tasks.filter(t => t.status === 'done').length > 0 && (
            <div>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Completed</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tasks.filter(t => t.status === 'done').map(task => (
                  <div key={task.id} style={{ background: '#faf8f2', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: 0.7 }}>
                    <input type="checkbox" checked={true} onChange={() => toggleStatus(task)} style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#4a7c3f' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '16px', color: '#8a7a6a', fontFamily: 'Georgia, serif', margin: 0, textDecoration: 'line-through' }}>{task.title}</p>
                    </div>
                    <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
