"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Service {
  _id: string  // MongoDB ObjectId
  name: string
  category: string
  price: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState<Omit<Service, "_id">>({ name: "", category: "", price: 0 })
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/subservices')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      alert("Failed to fetch services")
    }
  }

  const addService = async () => {
    try {
      const response = await fetch('/api/admin/subservices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      })

      if (!response.ok) {
        throw new Error('Failed to add service')
      }

      await fetchServices()
      setNewService({ name: "", category: "", price: 0 })
      setIsAddDialogOpen(false)
      alert("Service added successfully")
    } catch (error) {
      alert("Failed to add service")
    }
  }

  const updateService = async () => {
    if (!editingService) return

    try {
      const response = await fetch(`/api/admin/subservices/${editingService._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingService.name,
          category: editingService.category,
          price: editingService.price
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update service')
      }

      await fetchServices()
      setEditingService(null)
      setIsEditDialogOpen(false)
      alert("Service updated successfully")
    } catch (error) {
      alert("Failed to update service")
    }
  }

  const deleteService = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/subservices/${_id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete service')
      }

      await fetchServices()
      alert("Service deleted successfully")
    } catch (error) {
      alert("Failed to delete service")
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Services</h2>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add New Service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={newService.category}
                onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addService}>Add Service</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell> ₹ {service.price}</TableCell>
              <TableCell>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="mr-2" 
                      onClick={() => {
                        setEditingService(service)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Service</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingService?.name}
                          onChange={(e) =>
                            setEditingService(editingService ? { ...editingService, name: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-category" className="text-right">
                          Category
                        </Label>
                        <Input
                          id="edit-category"
                          value={editingService?.category}
                          onChange={(e) =>
                            setEditingService(editingService ? { ...editingService, category: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="edit-price"
                          type="number"
                          value={editingService?.price}
                          onChange={(e) =>
                            setEditingService(
                              editingService ? { ...editingService, price: Number(e.target.value) } : null
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={updateService}>Update Service</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteService(service._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}