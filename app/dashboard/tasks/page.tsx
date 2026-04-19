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
  board: string
}

const DEFAULT_BOARDS = [
  { name: 'General', color: '#4a7c3f' },
  { name: 'Ashley', color: '#7a3f6e' },
  { name: 'Darla', color: '#3f6e7a' },
  { name: 'Erin', color: '#7a5a3f' },
  { name: 'Holly', color: '#3f4a7a' },
  { name: 'Jennifer', color: '#7a3f3f' },
  { name: 'Samantha', color: '#3f7a5a' },
]

const priorityColor: Record<string, { bg: string, color: string }> = {
  high: { bg: '#f0e4e4', color: '#7a2a2a' },
  medium: { bg: '#f0e8d4', color: '#7a5a1a' },
  low: { bg: '#e8f0d4', color: '#2a5a1a' },
}

function TaskCard({ task, onEdit, onDragStart }: { task: Task, onEdit: (t: Task) => void, onDragStart: (t: Task) => void }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      onClick={() => onEdit(task)}
      style={{ background: '#fff', borderRadius: '6px', padding: '14px 16px', marginBottom: '8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #ede8df' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: task.description ? '6px' : '0' }}>
        <p style={{ fontSize: '14px', color: task.status === 'done' ? '#aaa' : '#1a2e1a', fontFamily: 'sans-serif', fontWeight: 500, margin: 0, textDecoration: task.status === 'done' ? 'line-through' : 'none', flex: 1, lineHeight: '1.4' }}>{task.title}</p>
        <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '20px', fontFamily: 'sans-serif', flexShrink: 0, background: priorityColor[task.priority]?.bg || '#f5f0e8', color: priorityColor[task.priority]?.color || '#5a5040', fontWeight: 500 }}>{task.priority}</span>
      </div>
      {task.description && <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: '0 0 6px', lineHeight: '1.4' }}>{task.description.length > 80 ? task.description.substring(0, 80) + '...' : task.description}</p>}
      {(task.assigned_to || task.due_date) && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
          {task.assigned_to && <span style={{ fontSize: '11px', color: '#6a8a6a', fontFamily: 'sans-serif', background: '#f0f5ee', padding: '2px 8px', borderRadius: '20px' }}>→ {task.assigned_to}</span>}
          {task.due_date && <span style={{ fontSize: '11px', color: '#8a6a5a', fontFamily: 'sans-serif', background: '#f5f0ea', padding: '2px 8px', borderRadius: '20px' }}>📅 {new Date(task.due_date).toLocaleDateString()}</span>}
        </div>
      )}
    </div>
  )
}

function TaskModal({ task, boards, onSave, onClose, onDelete }: {
  task: Partial<Task>
  boards: { name: string, color: string }[]
  onSave: (t: Partial<Task>) => void
  onClose: () => void
  onDelete?: () => void
}) {
  const [form, setForm] = useState(task)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '32px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontSize: '20px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>{task.id ? 'Edit Task' : 'New Task'}</h2>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Title *</label>
          <input required value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} placeholder="What needs to be done?" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Board</label>
            <select value={form.board || 'General'} onChange={e => {
  const personalBoards = ['Ashley', 'Darla', 'Erin', 'Holly', 'Jennifer', 'Samantha']
  const isPersonal = personalBoards.includes(e.target.value)
  setForm({...form, board: e.target.value, assigned_to: isPersonal ? e.target.value : form.assigned_to})
}} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
              {boards.map(b => <option key={b.name}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Priority</label>
            <select value={form.priority || 'medium'} onChange={e => setForm({...form, priority: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Assign To</label>
            <input value={form.assigned_to || ''} onChange={e => setForm({...form, assigned_to: e.target.value})} placeholder="Member name" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Due Date</label>
            <input type="date" value={form.due_date || ''} onChange={e => setForm({...form, due_date: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Description</label>
          <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} placeholder="Additional details..." rows={3} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        {task.id && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Status</label>
            <select value={form.status || 'todo'} onChange={e => setForm({...form, status: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
              <option value="todo">To Do</option>
              <option value="done">Done</option>
            </select>
          </div>
        )}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={() => onSave(form)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>
            {task.id ? 'Save Changes' : 'Add Task'}
          </button>
          <button onClick={onClose} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          {task.id && onDelete && (
            <button onClick={onDelete} style={{ background: '#f0e4e4', color: '#7a2a2a', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', marginLeft: 'auto' }}>Delete</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [boards, setBoards] = useState(DEFAULT_BOARDS)
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState<Partial<Task>>({})
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [dragOverBoard, setDragOverBoard] = useState<string | null>(null)
  const [newBoardName, setNewBoardName] = useState('')
  const [showNewBoard, setShowNewBoard] = useState(false)

  useEffect(() => { fetchTasks() }, [])

  async function fetchTasks() {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
    setTasks(data || [])
    setLoading(false)
  }

  async function saveTask(form: Partial<Task>) {
    if (!form.title) return
    const taskData = {
      ...form,
      due_date: form.due_date || null,
      assigned_to: form.assigned_to || null,
      board: form.board || 'General',
      status: form.status || 'todo',
      priority: form.priority || 'medium',
    }
    if (form.id) {
      await supabase.from('tasks').update(taskData).eq('id', form.id)
    } else {
      await supabase.from('tasks').insert([taskData])
    }
    setShowModal(false)
    fetchTasks()
  }

  async function deleteTask(id: string) {
    if (!confirm('Delete this task?')) return
    await supabase.from('tasks').delete().eq('id', id)
    setShowModal(false)
    fetchTasks()
  }

  function openNew(board: string = 'General') {
    setEditTask({ board, priority: 'medium', status: 'todo' })
    setShowModal(true)
  }

  function openEdit(task: Task) {
    setEditTask(task)
    setShowModal(true)
  }

  async function handleDrop(boardName: string) {
    if (!draggedTask) return
    await supabase.from('tasks').update({ board: boardName }).eq('id', draggedTask.id)
    setDraggedTask(null)
    setDragOverBoard(null)
    fetchTasks()
  }

  function addBoard() {
    if (!newBoardName.trim()) return
    const colors = ['#6a5acd', '#2e8b57', '#8b4513', '#4682b4', '#9b2335', '#2e6b5e']
    const color = colors[boards.length % colors.length]
    setBoards(prev => [...prev, { name: newBoardName.trim(), color }])
    setNewBoardName('')
    setShowNewBoard(false)
  }

  return (
    <div style={{ padding: '40px' }}>
      {showModal && (
        <TaskModal
          task={editTask}
          boards={boards}
          onSave={saveTask}
          onClose={() => setShowModal(false)}
          onDelete={editTask.id ? () => deleteTask(editTask.id!) : undefined}
        />
      )}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Task Board</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{tasks.filter(t => t.status === 'todo').length} open · {tasks.filter(t => t.status === 'done').length} completed</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {showNewBoard ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)} placeholder="Board name" onKeyDown={e => e.key === 'Enter' && addBoard()} autoFocus style={{ padding: '8px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }} />
              <button onClick={addBoard} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Add</button>
              <button onClick={() => setShowNewBoard(false)} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowNewBoard(true)} style={{ background: '#f5f0e8', color: '#5a5040', border: '1px solid #ddd8cc', padding: '10px 16px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ New Board</button>
          )}
          <button onClick={() => openNew()} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>+ New Task</button>
        </div>
      </div>

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
          {boards.map(board => (
            <div
              key={board.name}
              onDragOver={e => { e.preventDefault(); setDragOverBoard(board.name) }}
              onDragLeave={() => setDragOverBoard(null)}
              onDrop={() => handleDrop(board.name)}
              style={{ background: dragOverBoard === board.name ? '#eef5ec' : '#faf8f2', borderRadius: '10px', overflow: 'hidden', border: dragOverBoard === board.name ? `2px solid ${board.color}` : '2px solid transparent', transition: 'all 0.15s' }}
            >
              <div style={{ background: board.color, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', color: '#fff', fontFamily: 'sans-serif', fontWeight: 600, margin: 0 }}>{board.name}</h3>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.2)', padding: '1px 8px', borderRadius: '20px' }}>{tasks.filter(t => t.board === board.name && t.status === 'todo').length}</span>
                </div>
                <button onClick={() => openNew(board.name)} style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', border: 'none', width: '26px', height: '26px', borderRadius: '6px', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
              </div>
              <div style={{ padding: '12px' }}>
                {tasks.filter(t => t.board === board.name && t.status === 'todo').map(task => (
                  <TaskCard key={task.id} task={task} onEdit={openEdit} onDragStart={setDraggedTask} />
                ))}
                {tasks.filter(t => t.board === board.name && t.status === 'done').length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#aaa', fontFamily: 'sans-serif', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '2px' }}>Completed</p>
                    {tasks.filter(t => t.board === board.name && t.status === 'done').map(task => (
                      <TaskCard key={task.id} task={task} onEdit={openEdit} onDragStart={setDraggedTask} />
                    ))}
                  </div>
                )}
                {tasks.filter(t => t.board === board.name).length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <p style={{ fontSize: '13px', color: '#aaa', fontFamily: 'sans-serif', margin: 0 }}>No tasks yet</p>
                    <button onClick={() => openNew(board.name)} style={{ marginTop: '8px', background: 'none', border: 'none', color: board.color, fontSize: '13px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ Add task</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
