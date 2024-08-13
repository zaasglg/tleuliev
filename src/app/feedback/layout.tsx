import { Metadata } from "next";
import LayoutsApp from "@/app/(dashboard)/layouts-app";

export const metadata: Metadata = {
    title: 'Кері байланыс',
    description: '...',
};

export default function ResultLayout({
                                       children,
}: {
    children: React.ReactNode;
}) {
    return <LayoutsApp>{children}</LayoutsApp>;
}
