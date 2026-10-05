import { Link } from "react-router-dom";
import "./ApplicationCard.css";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useDeleteApplication } from "../../hooks/application/useDeleteApplication";

function ApplicationCard(props) {
  const { application } = props;
  const { mutate: deleteApplication, isPending } = useDeleteApplication();

  const deleteApplicationHandler = () => {
    deleteApplication(application._id);
  };

  return (
    <div className="app-card">
      <Link
        to={`/property/${application.property._id}`}
        className="imageContainer"
      >
        <img
          src={application?.property.propertyImage}
          alt={application?.property.name}
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/property/${application.property._id}`}>
            {application?.property.name}
          </Link>
        </h2>
        <div className="address">
          <MapPin className="h-4 w-4" />
          <span>{application?.property.location}</span>
          <Badge
            className={`ml-2 text-white capitalize ${
              application?.property.status === "open"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {application?.property.status}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {application?.property.furnishStatus}
          </Badge>
        </div>
        <p className="price">
          {application?.property.price
            ? "₹ " + application.property.price.toLocaleString("en-IN")
            : "Price on request"}
        </p>
        <div className="bottom">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={deleteApplicationHandler}
            disabled={isPending}
          >
            {isPending ? "Cancelling..." : "Cancel Application"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
