import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Pencil, Trash2 } from "lucide-react";

import "../application/ApplicationCard.css";

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
    setOpenDeleteAlert(false);
  };

  return (
    <div className="app-card">
      <Link to={`/property/${userProperty?._id}`} className="imageContainer">
        <img src={userProperty?.propertyImage} alt={userProperty?.name} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/property/${userProperty._id}`}>{userProperty?.name}</Link>
        </h2>
        <div className="address">
          <MapPin className="h-4 w-4" />
          <span>{userProperty?.location}</span>
          <Badge
            className={`ml-2 text-white capitalize ${
              userProperty.status === "open" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {userProperty?.status}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {userProperty?.furnishStatus}
          </Badge>
        </div>
        <p className="price">
          {userProperty?.price
            ? "₹ " + userProperty.price.toLocaleString("en-IN")
            : "Price on request"}
        </p>

        <div className="bottom">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer hover:scale-105"
            onClick={() => onEdit(userProperty)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer hover:scale-105"
            onClick={() => setOpenDeleteAlert(true)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              property and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDeleteAlert(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={deletePropertyHandler}
              className="cursor-pointer"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UserPropertyCard;
