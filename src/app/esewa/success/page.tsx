"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  

  const searchParams = useSearchParams()
  const transaction_uuid = searchParams.get("transaction_uuid")
  const nameP = searchParams.get("name")
  const emailP = searchParams.get("email")
  

  useEffect(() => {
    if (transaction_uuid && nameP && emailP) {
      console.log("Transaction UUID:", transaction_uuid)
      console.log("Name from URL:", nameP)
      console.log("Email from URL:", emailP)
      setName(nameP)
      setEmail(emailP)
    }
  }, [transaction_uuid, nameP, emailP]) // ✅ use nameP and emailP here

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-green-600">Payment Success</h1>
      <p className="text-gray-800 mt-2">The name is: {name}</p>
      <p className="text-gray-800">The email is: {email}</p>
      <p className="text-gray-800">The transaction UUID is: {transaction_uuid}</p>
      
    </div>
  )
}
