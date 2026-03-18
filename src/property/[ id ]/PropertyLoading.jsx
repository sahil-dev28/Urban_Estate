import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import "./PropertyPage.css";

function PropertyLoading() {
  return (
    <section className="property-page flex flex-col md:flex-row gap-4">
      <div className="property-details">
        <Skeleton className="w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-none">
          <Skeleton className="w-full h-full rounded-none" />
          <Skeleton className="rounded-none text-4xl uppercase"></Skeleton>
        </Skeleton>
        <Skeleton className="property-title"></Skeleton>
        <Skeleton className="property-location">
          <Skeleton></Skeleton>
        </Skeleton>
        <Skeleton className="property-price"></Skeleton>
        <Skeleton className="property-description"></Skeleton>
      </div>
      <div className="property-features">
        <div className="property-wrapper">
          <Skeleton className="title"></Skeleton>
          <div className="status">
            <div className="feature">
              <div className="statusText">
                <Skeleton></Skeleton>
              </div>
            </div>
            <div className="feature">
              <div className="statusText">
                <Skeleton></Skeleton>
              </div>
            </div>
          </div>
          <Skeleton className="title"></Skeleton>
          <div className="status">
            <div className="featureText">
              <Skeleton></Skeleton>
            </div>
          </div>
          <CardHeader className="mt-5 pl-1">
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <Skeleton></Skeleton>
            </CardTitle>
            <Skeleton className="m-auto mt-5 w-[200px] h-[200px]"></Skeleton>
          </CardHeader>
        </div>
      </div>
    </section>
  );
}

export default PropertyLoading;
