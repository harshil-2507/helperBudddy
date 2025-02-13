"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "react-hot-toast"

interface Service {
  _id: string
  name: string
  isApproved: boolean
}

interface User {
  _id: string
  fullName: string
  email: string
  isApproved: boolean
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userServices, setUserServices] = useState<Service[]>([])
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
      alert("Failed to fetch users")
    }
  }

  const fetchUserServices = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/users/services/${id}`)
      const data = await response.json()
      console.log("Fetched services:", data)

      if (!response.ok) {
        throw new Error(`Failed to fetch user services: ${response.statusText}`)
      }

      setUserServices(data)
    } catch (error) {
      console.error("Failed to fetch user services:", error)
      toast.error("Failed to fetch user services")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (_id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${_id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete user")
      }
      setUsers(users.filter((user) => user._id !== _id))
      toast.success("User deleted successfully")
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast.error("Failed to delete user")
    }
  }
  const toggleUserVerification = async (_id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update approval status")
      }

      const data = await response.json()
      console.log("User approval updated:", data)

      setUsers(users.map((user) => (user._id === _id ? { ...user, isApproved: !currentStatus } : user)))

      if (!currentStatus) {
        const emailResponse = await fetch("/api/admin/send-verification-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: _id }),
        })

        if (emailResponse.ok) {
          toast.success("Verification email sent successfully")
        } else {
          toast.error("Failed to send verification email")
        }
      }
    } catch (error) {
      console.error("Error updating user approval:", error)
      alert("Failed to update user approval")
    }
  }

  const toggleServiceVerification = async (_id: string, currentStatus: boolean, uid?: string) => {
    if (!uid) {
      toast.error("User ID not found")
      return
    }
  
    try {
      const response = await fetch(`/api/admin/users/services/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: !currentStatus }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to update service verification status")
      }
  
      const data = await response.json()
      console.log("Service approval updated:", data)
  
      setUserServices(userServices.map((service) =>
        service._id === _id ? { ...service, isApproved: !currentStatus } : service
      ))
  
      if (!currentStatus) {
        const emailResponse = await fetch("/api/admin/send-serviceverification-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            serviceId: _id, 
            WorkerId: uid 
          }),
        })
        
        if (!emailResponse.ok) {
          throw new Error("Failed to send service verification email")
        }
        
        toast.success("Service verification email sent successfully")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "An error occurred")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <button onClick={() => toggleUserVerification(user._id, user.isApproved)}
                  className="hover:opacity-70 transition-opacity">
                  {user.isApproved ? (
                    <CheckCircle className="text-green-500 h-5 w-5 cursor-pointer" />
                  ) : (
                    <XCircle className="text-red-500 h-5 w-5 cursor-pointer" />
                  )}
                </button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedUser(user)
                  fetchUserServices(user._id)
                  setIsUserDialogOpen(true)
                }}>
                  View Services
                </Button>
                <button onClick={() => deleteUser(user._id)} className="ml-2 hover:opacity-70 transition-opacity">
                 Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.fullName}'s Services</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading services...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Service Verified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userServices.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleServiceVerification(service._id, service.isApproved, selectedUser?._id)}
                        className="hover:opacity-70 transition-opacity">
                        {service.isApproved ? (
                          <CheckCircle className="text-green-500 h-5 w-5 cursor-pointer" />
                        ) : (
                          <XCircle className="text-red-500 h-5 w-5 cursor-pointer" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm"
                        onClick={() => toggleServiceVerification(service._id, service.isApproved, selectedUser?._id)}>
                        {service.isApproved ? "Unverify" : "Verify"} Service
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
