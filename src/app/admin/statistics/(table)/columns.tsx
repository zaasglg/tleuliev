"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserTable = {
  name: string
	phone: string
	region_name: string
	district_name: string
}

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import UpdateUser from '../update'

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "name",
    header: "Аты-жөні",
  },
	{
    accessorKey: "phone",
    header: "Телефон номері",
  },
	{
    accessorKey: "region_name",
    header: "Облыс",
  },
	{
    accessorKey: "district_name",
    header: "Аудан қала",
  },
	// {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const user = row.original
 
  //     return (
  //       <UpdateUser user={user} />
  //     )
  //   },
  // },
]
