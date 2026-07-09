"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ResourceManager } from "@/components/admin/resource-manager";
import { resourceConfigs } from "@/lib/admin/resources";
import { Button } from "@/components/ui/button";

export default function AdminResourcePage() {
  const params = useParams();
  const resourceKey = params.resource as string;

  if (!resourceConfigs[resourceKey]) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted">Resource not found</p>
        <Button asChild><Link href="/admin">Back to Dashboard</Link></Button>
      </div>
    );
  }

  return <ResourceManager resourceKey={resourceKey} />;
}
