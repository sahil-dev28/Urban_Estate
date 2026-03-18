import { Link } from "react-router-dom";
import { useState } from "react";

import "../application/ApplicationCard.css";
import location from "../../../src/assets/pin.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useDeleteUserProperty from "../../hooks/properties/useDeleteUserProperty";

function UserPropertyCard(props) {
  const { userProperty, onEdit } = props;
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const { mutate: deleteUserProperty } = useDeleteUserProperty();

  const deletePropertyHandler = () => {
    deleteUserProperty(userProperty._id);
  };

  const toggleDeleteAlert = () => {
    setOpenDeleteAlert((prev) => !prev);
  };

  return (
    <div className="card">
      <Link to={`/property/${userProperty?._id}`} className="imageContainer">
        <img src={userProperty?.propertyImage} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/property/${userProperty._id}`}>{userProperty?.name}</Link>
        </h2>
        <div className="address">
          <img src={location} alt="location" />
          <span>{userProperty?.location}</span>
          <Badge
            className={`badge ${
              userProperty.status === "open" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {userProperty?.status}
          </Badge>

          <Badge variant="secondary" className="secondary-badge text-black">
            {userProperty?.furnishStatus}
          </Badge>
        </div>
        <div>
          <p className="price">
            {userProperty?.price
              ? " $ " + userProperty.price
              : "Price not mentioned"}
          </p>
        </div>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <Button
                type="button"
                variant="secondary"
                className="w-full hover:scale-105 cursor-pointer"
                onClick={() => onEdit(userProperty)}
              >
                Edit
              </Button>
            </div>
            <div className="feature">
              <Button
                type="button"
                className="cursor-pointer hover:scale-105 w-full"
                variant="destructive"
                onClick={toggleDeleteAlert}
              >
                Delete
              </Button>
              <AlertDialog open={openDeleteAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this property and remove data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      onClick={toggleDeleteAlert}
                      className="cursor-pointer hover:scale-105"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={deletePropertyHandler}
                      type="button"
                      variant="destructive"
                      className="cursor-pointer hover:scale-105"
                    >
                      Confirm
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPropertyCard;
