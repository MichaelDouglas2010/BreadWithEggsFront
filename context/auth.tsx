import React, { createContext, useContext, useState } from 'react'
import { router, useFocusEffect } from 'expo-router'
import User from '../components/interfaces/user'
import api from '../helpers/axios'

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
  const [user, setUser] = useState<User>({ email: '', password: '', name: '', team: '' })

  async function handleLogin() {
    try {
      if (!user.email) alert('Insira usuário e senha!')
      else {
        const response = await api.get(`/user/login/${user.email}`)
        if (user.password == response.data.password) {
          setUser(response.data)
          router.push('home')
        }
        else { alert('Usuário ou senha não encontrado!') }
      }
    }
    catch (e) {
      const error = e as { status?: number }
      //console.log("Erro: " + e)
      if (error.status === 404) alert('Usuário ou senha não encontrado!')
      if (error.status === 500) alert('Insira usuário e senha!')
    }

  }
  /*
      if (foundUser) {
        setUser(foundUser)
        router.push('home')
      } else {
        alert('Usuário ou senha inválidos')
      }
    }*/

  return (
    <AuthContext.Provider value={{ user, handleLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}