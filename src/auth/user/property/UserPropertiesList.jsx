import "../../../components/application/ApplicationList.css";
import { Building2 } from "lucide-react";

import { useSearchParams } from "react-router-dom";
import Filter from "../../../components/filter/Filter";
import useGetUserPropertiesQuery from "../../../hooks/properties/useGetUserPropertiesQuery";
import UserPropertyCard from "../../../components/property/UserPropertyCard";
import PropertyForm from "../../../components/property/PropertyForm";
import Loader from "../../../components/common/Loader";
import ErrorState from "../../../components/common/ErrorState";
import EmptyState from "../../../components/common/EmptyState";

import { useState } from "react";

export default function UserPropertiesList() {
  const [currentEditProperty, setCurrentEditProperty] = useState({});
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const { userProperty, isLoading, isError, error } =
    useGetUserPropertiesQuery(params);

  const editPropertyHandler = (property) => {
    setCurrentEditProperty(property);
    setShowPropertyForm(true);
  };
  const togglePropertyForm = (state) => {
    setCurrentEditProperty({});
    setShowPropertyForm(state);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorState message={error.message} />;
  }
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="listWrapper">
          <div className="list-header">
            <div>
              <h1 className="list-title">My Properties</h1>
              <p className="list-subtitle">
                Manage the properties you have listed.
              </p>
            </div>
            <PropertyForm
              open={showPropertyForm}
              onToggle={togglePropertyForm}
              currentEditProperty={currentEditProperty}
            />
          </div>
          <Filter />
          {!userProperty?.length ? (
            <EmptyState
              icon={Building2}
              title="No properties yet"
              message="Create your first listing so tenants can find and apply for it."
            />
          ) : (
            userProperty.map((property) => (
              <UserPropertyCard
                key={property._id}
                userProperty={property}
                onEdit={editPropertyHandler}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
