import React, { createContext, useContext, useState } from 'react'
import { router } from 'expo-router'
import User from '../components/interfaces/user'
import mockUser from '../components/interfaces/mockups/user-mockup'

/*interface IUser {
  email: string
  password: string
}*/

interface IAuthContext {
  user: User
  setUser: (user: User) => void
  handleLogin: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({email: '', password: '', name: '', team:''})

  function handleLogin() {
    const foundUser = mockUser.find(
      (i) => i.email === user.email && i.password === user.password
    )
  
    if (foundUser) {
      setUser(foundUser)
      router.push('home')
    } else {
      alert('Usuário ou senha inválidos')

      router.push('home')
    }
  }
/*    if(user && user.email === 'admin' && user.password === 'admin') {
      router.push('home')
    } else {
      alert('Usuário ou senha inválidos')
    }
  }
*/

  return (
    <AuthContext.Provider value={{ user, handleLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}