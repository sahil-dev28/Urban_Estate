import "../../../components/application/ApplicationList.css";
import { Building2 } from "lucide-react";

import { useSearchParams } from "react-router-dom";
import Filter from "../../../components/filter/Filter";
import useGetUserPropertiesQuery from "../../../hooks/properties/useGetUserPropertiesQuery";
import UserPropertyCard from "../../../components/property/UserPropertyCard";
import { enterUp, stagger } from "../../../lib/motion";
import PropertyForm from "../../../components/property/PropertyForm";
import ListRowSkeleton from "../../../components/common/ListRowSkeleton";
import ErrorState from "../../../components/common/ErrorState";
import EmptyState from "../../../components/common/EmptyState";
import Pagination from "../../../components/common/Pagination";

import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

export default function UserPropertiesList() {
  const [currentEditProperty, setCurrentEditProperty] = useState({});
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;

  const { userProperty, totalPages, isLoading, isError, error } =
    useGetUserPropertiesQuery({ ...params, pageNumber, pageSize: PAGE_SIZE });

  // Deleting the last listing on the last page leaves us past the end; step back
  useEffect(() => {
    if (totalPages > 0 && pageNumber > totalPages) {
      const next = new URLSearchParams(searchParams);
      next.set("pageNumber", String(totalPages));
      setSearchParams(next, { replace: true });
    }
  }, [pageNumber, totalPages, searchParams, setSearchParams]);

  const editPropertyHandler = (property) => {
    setCurrentEditProperty(property);
    setShowPropertyForm(true);
  };
  const togglePropertyForm = (state) => {
    setCurrentEditProperty({});
    setShowPropertyForm(state);
  };

  if (isLoading) {
    return (
      <div className="listPage">
        <div className="listWrapper">
          {Array.from({ length: 3 }, (_, i) => (
            <ListRowSkeleton key={i} />
          ))}
        </div>
      </div>
    );
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
            userProperty.map((property, index) => (
              <div
                key={property._id}
                className={enterUp}
                style={stagger(index, 70)}
              >
                <UserPropertyCard
                  userProperty={property}
                  onEdit={editPropertyHandler}
                />
              </div>
            ))
          )}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
