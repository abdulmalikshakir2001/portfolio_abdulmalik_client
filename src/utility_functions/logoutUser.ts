'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export default  async function logoutUser(){
    cookies().delete('authToken')
    redirect('/login')
}