"use client"; // Needed for client-side interactivity

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import certifiedTesters from "@/data/nstqb.json";

type certifiedTesterType={
    name:string,
    examType:string,    
    data:Date
}

export default function CertifiedTestersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTesters = certifiedTesters.filter((tester) =>
    tester.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 ">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-3xl font-bold text-gray-600">
              ISTQB Certified Testers
              <Badge variant="secondary" className="ml-2">
                CTFL
              </Badge>
            </CardTitle>
            <div className="w-full md:w-64">
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              {filteredTesters.length === certifiedTesters.length
                ? <span>"A list of our ISTQB Certified Testers."</span>
                : `Showing ${filteredTesters.length} of ${certifiedTesters.length} testers`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S.N.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date of Exam</TableHead>
                <TableHead className="text-right">Exam Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTesters.length > 0 ? (
                filteredTesters.map((tester) => (
                  <TableRow key={tester.id}>
                    <TableCell className="font-medium">{tester.id}</TableCell>
                    <TableCell>{tester.name}</TableCell>
                    <TableCell>{tester.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{tester.examType}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No matching testers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}