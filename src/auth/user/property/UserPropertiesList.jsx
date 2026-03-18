import "../../../components/application/ApplicationList";

import Filter from "../../../components/filter/Filter";
import useGetUserPropertiesQuery from "../../../hooks/properties/useGetUserPropertiesQuery";
import UserPropertyCard from "../../../components/property/UserPropertyCard";
import PropertyForm from "../../../components/property/PropertyForm";

import { useState } from "react";
import { useCreatePropertyMutation } from "../../../hooks/properties/useCreatePropertyMutation";
import { useUpdatePropertyMutation } from "../../../hooks/properties/useUpdatePropertyMutation";

export default function UserPropertiesList() {
  const [currentEditProperty, setCurrentEditProperty] = useState({});
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const { userProperty, isLoading, isError, error } =
    useGetUserPropertiesQuery();

  const { isLoading: createPropertyIsLoading } = useCreatePropertyMutation();
  const { isLoading: updatePropertyIsUpdating } = useUpdatePropertyMutation();

  const editPropertyHandler = (property) => {
    setCurrentEditProperty(property);
    setShowPropertyForm(true);
    console.log(property);
  };
  const togglePropertyForm = (state) => {
    setCurrentEditProperty({});
    setShowPropertyForm(state);
  };

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
    <div className="listPage">
      <div className="listContainer">
        <div className="listWrapper">
          <Filter />
          <div className="justify-end flex ">
            <PropertyForm
              open={showPropertyForm}
              onToggle={togglePropertyForm}
              currentEditProperty={currentEditProperty}
              disabled={createPropertyIsLoading || updatePropertyIsUpdating}
            />
          </div>
          {userProperty.map((property) => (
            <UserPropertyCard
              key={property._id}
              userProperty={property}
              onEdit={editPropertyHandler}
            />
          ))}
        </div>
      </div>
      <div className="mapContainer"></div>
    </div>
  );
}
