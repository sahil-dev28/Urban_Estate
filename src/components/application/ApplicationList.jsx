import "./ApplicationList.css";

import useGetUserApplication from "../../hooks/application/useGetUserApplication";
import ApplicationCard from "./ApplicationCard";
import Filter from "../filter/Filter";
import Map from "../map/Map";

export default function ApplicationList() {
  const { application, isLoading, isError, error } = useGetUserApplication();

  console.log(application);

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
          {application.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map />
      </div>
    </div>
  );
}
