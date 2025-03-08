
// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// const BlinkingDot = () => {
//   return (
//     <div className="relative inline-flex items-center ml-2">
//       <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
//       <div className="absolute w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
//     </div>
//   );
// };

// const NonAvailableServices = () => {
//   const [services, setServices] = useState<{ serviceName: string; searchCount: number }[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNonAvailableServices = async () => {
//       try {
//         const response = await fetch("/api/nonavailable-services");
//         const data = await response.json();
//         console.log("data", data);
//         setServices(data.services);
//       } catch (error) {
//         console.error("Error fetching non-available services:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNonAvailableServices();
//   }, []);

//   if (loading) {
//     return (
//       <Card className="w-full">
//         <CardContent className="p-6">
//           <div className="flex items-center justify-center">
//             <div className="animate-spin h-6 w-6 border-2 border-red-500 rounded-full border-t-transparent" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row items-center space-x-0">
//         <h2 className="text-lg font-semibold mr-4">Non-Available Services</h2>
//         <BlinkingDot />
//       </CardHeader>
//       <CardContent>
//         {services.length === 0 ? (
//           <div className="text-center py-6 text-gray-500">
//             No missing services reported yet.
//           </div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Service Name</TableHead>
//                 <TableHead className="text-right">Search Count</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {services.map((service, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{service.serviceName}</TableCell>
//                   <TableCell className="text-right">{service.searchCount}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default NonAvailableServices;

"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Service {
  serviceName: string;
  searchCount: number;
}

interface NonAvailableServicesProps  {
  services?: Service[];
}

const ITEMS_PER_PAGE = 8;

const BlinkingDot = () => {
  return (
    <div className="relative inline-flex items-center ml-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
    </div>
  );
};

const NonAvailableServices: React.FC<NonAvailableServicesProps> = ({ services: initialServices = [] }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on component mount
  useEffect(() => {
    const fetchNonAvailableServices = async () => {
      try {
        const response = await fetch("/api/nonavailable-services");
        const data = await response.json();
        console.log("data", data);
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching non-available services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNonAvailableServices();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

  // Get current page's services
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-lg font-semibold">Non-Available Services</h2>
        </CardHeader>
        <CardContent className="text-center py-6 text-gray-500">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-0">
        <h2 className="text-lg font-semibold mr-4">Non-Available Services</h2>
        <BlinkingDot />
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No missing services reported yet.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead className="text-right">Search Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell className="text-right">{service.searchCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, services.length)} of {services.length}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and pages around current page
                        const shouldShow = 
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1;
                        return shouldShow;
                      })
                      .map((page, index, array) => (
                        <React.Fragment key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className="mx-1 min-w-[32px]"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NonAvailableServices as unknown as React.ComponentType;