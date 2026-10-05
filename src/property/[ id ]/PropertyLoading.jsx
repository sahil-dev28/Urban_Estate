import { Skeleton } from "@/components/ui/skeleton";

import "./PropertyPage.css";

function PropertyLoading() {
  return (
    <section className="property-page">
      <div className="property-details">
        <Skeleton className="property-hero" />
        <div className="property-heading">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="property-info-grid">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="property-features">
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    </section>
  );
}

export default PropertyLoading;
