import { Metadata } from "next";
import LayoutsApp from "@/app/(dashboard)/layouts-app";

export const metadata: Metadata = {
    title: 'Нұсқаулық',
    description: '...',
};

export default function TestLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <LayoutsApp>
                {children}
            </LayoutsApp>
        </>
    );
}
