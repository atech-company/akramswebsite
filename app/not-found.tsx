import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-gradient mb-4">404</p>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
