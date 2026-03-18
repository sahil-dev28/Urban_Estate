import useProperties from "../../hooks/properties/useProperties";
import Filter from "../filter/Filter";
import PropertyCard from "./PropertyCard";
import PropertyFilterCard from "./PropertyFilterCard";

export default function PropertyList() {
  const { property, isLoading, isError, error } = useProperties();

  console.log(property);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <PropertyFilterCard className="grid gap-5" /> */}
      <Filter />

      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-3.5">
          {property.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </>
    </div>
  );
}
