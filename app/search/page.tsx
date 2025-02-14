import { Suspense } from "react"
import SearchBar from "../(components)/SearchBar"
import { connectToDatabase } from "@/lib/db"

async function SearchResults({ query }: { query: string }) {
  const db = await connectToDatabase()
  const services = await db
    .collection("services")
    .find({
      $or: [{ name: { $regex: query, $options: "i" } }, { category: { $regex: query, $options: "i" } }],
    })
    .toArray()

  return (
    <ul>
      {services.map((service) => (
        <li key={service.id} className="mb-4">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-600">{service.category}</p>
        </li>
      ))}
    </ul>
  )
}

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}

