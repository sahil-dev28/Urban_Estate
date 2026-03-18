import { Link } from "react-router-dom";
import "./ApplicationCard.css";
import location from "../../../src/assets/pin.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useDeleteApplication } from "../../hooks/application/useDeleteApplication";

function ApplicationCard(props) {
  const { application } = props;
  const { mutate: deleteApplication } = useDeleteApplication();

  const deleteApplicationHandler = () => {
    deleteApplication(application._id);
  };

  return (
    <div className="card">
      <Link
        to={`/property/${application.property._id}`}
        className="imageContainer"
      >
        <img src={application?.property.propertyImage} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/property/${application.property._id}`}>
            {application?.property.name}
          </Link>
        </h2>
        <p className="address">
          <img src={location} alt="location" />
          <span>{application?.property.location}</span>
        </p>
        <p className="price">
          {application?.property.price
            ? " $ " + application.property.price
            : "Price not mentioned"}
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <Badge
                className={`text-white capitalize ${
                  application?.property.status === "open"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {application?.property.status}
              </Badge>
            </div>
            <div className="feature">
              <Badge variant="secondary" className="capitalize">
                {application?.property.furnishStatus}
              </Badge>
            </div>
            <div className="feature">
              <Button
                type="button"
                className="cursor-pointer hover:scale-105 w-full"
                variant="destructive"
                onClick={deleteApplicationHandler}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
