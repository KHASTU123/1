'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
    })
    if (res.ok) {
      const data = await res.json()
      document.cookie = `token=${data.token}; path=/`
      if (data.role === 'admin') router.push('/admin')
      else router.push('/')
    } else {
      alert('Đăng nhập thất bại')
    }
  }

  return (
    <div className="p-6 space-y-2">
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPass(e.target.value)} />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  )
}
