import "./ApplicationList.css";
import { ClipboardList } from "lucide-react";

import useGetUserApplication from "../../hooks/application/useGetUserApplication";
import ApplicationCard from "./ApplicationCard";
import { enterUp, stagger } from "../../lib/motion";
import ListRowSkeleton from "../common/ListRowSkeleton";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

export default function ApplicationList() {
  const { application, isLoading, isError, error } = useGetUserApplication();

  // Skip applications whose property was deleted by the landlord
  const applications = application?.filter((app) => app.property) ?? [];

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
              <h1 className="list-title">My Applications</h1>
              <p className="list-subtitle">Properties you have applied for.</p>
            </div>
          </div>
          {applications.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No applications yet"
              message="Browse properties and apply to the ones you like."
              actionLabel="Browse properties"
              actionTo="/property"
            />
          ) : (
            applications.map((app, index) => (
              <div key={app._id} className={enterUp} style={stagger(index, 70)}>
                <ApplicationCard application={app} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
