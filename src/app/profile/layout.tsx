import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Жеке кабинет',
    description: '...',
};

export default function TestLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
