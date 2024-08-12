"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import LayoutsApp from "@/app/(dashboard)/layouts-app";

export default function Home() {

  return (
      <LayoutsApp>

          <section>
              <div>
                  <h2 className="text-4xl font-medium">Басты бет</h2>
              </div>

              {/*breadcrumb*/}
              <Breadcrumb className="mt-5">
                  <BreadcrumbList>
                      <BreadcrumbItem>
                          <BreadcrumbLink>Басты бет</BreadcrumbLink>
                      </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </section>

      </LayoutsApp>
  );
}
