import TopNavbar from "@/components/TopNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <TopNavbar />
        <main>{children}</main>
        </>
    );
}