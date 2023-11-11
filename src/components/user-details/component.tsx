import React, { useContext } from 'react'
import { UserContext } from '../../contexts/userDetails'

const FetchUserdetails = () => {
  const { username } = useContext(UserContext)
  return <> {username ? `Hello ${username}` : `Hello User`}</>
}
export default FetchUserdetails