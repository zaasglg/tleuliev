import Aside from "@/app/(dashboard)/aside";
import { ReactNode } from "react";

export default function LayoutsApp({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-64 flex-none">
                <Aside />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-50">
                {children}
            </div>
        </div>
    );
}
