import { useMutation } from '@tanstack/react-query'
import loginService from '../../services/auth/login/login.service'

export const useLogin = () => {
  return useMutation(['login'], phone => loginService.login(phone))
}

export const useLoginConfirm = () => {
  return useMutation(['login-confirm'], ({ id, code }) => loginService.confirm(id, code))
}
