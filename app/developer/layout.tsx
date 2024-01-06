import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
