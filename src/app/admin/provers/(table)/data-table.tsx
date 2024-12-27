"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
	ColumnFiltersState,
	getFilteredRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { User } from '@/types/user.types'
import UpdateUser from '@/app/redactor/users/update'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const columns: ColumnDef<User>[] = [
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
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
   
        return (
          <UpdateUser user={user} />
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
		state: {
      columnFilters,
    },
  })

  return (
		<>
		<div className="flex items-center py-4">
        <Input
          placeholder="Іздеу"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
        {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Ештеңке табылмады 🙁
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
		</>
  )
}
