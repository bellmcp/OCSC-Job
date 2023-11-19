import { getCookie } from 'utils/cookies'
import parseJwt from 'utils/parseJwt'

export const isLogin = () => {
  const token = getCookie('token')
  if (token === null) {
    return false
  }
  if (token !== '' || token !== undefined) {
    return true
  }
  return false
}

export const getRole = () => {
  const token = getCookie('token')
  return parseJwt(token).role
}

export const isLoginAsUser = () => {
  // TODO: Remove
  return isLogin() && getRole() === 'worker'
}

export const isLoginAsOCSC = () => {
  return isLogin() && getRole() === 'ocsc'
}

export const isLoginAsAdmin = () => {
  return isLogin() && getRole() === 'ocsc'
}

export const isLoginAsWorker = () => {
  return isLogin() && getRole() === 'worker'
}
