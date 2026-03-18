import "./PropertyPage.css";
import profilejpg from "../../../src/assets/noavatar.jpg";
// import location from "../../../src/assets/pin.png";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import BookPropertyButton from "../../components/property/BookPropertyButton";
import useSinglePropertyPage from "../../hooks/properties/useSinglePropertyPage";
import { useParams } from "react-router";
import PropertyLoading from "./PropertyLoading";

export default function PropertyPage() {
  const { id } = useParams();
  const { property, isLoading, error } = useSinglePropertyPage({ id });
  console.log("Property Data:", property);

  if (isLoading) {
    return <PropertyLoading />;
  }

  if (error) {
    let error = {
      message: `Something's went wrong!`,
    };
    if (error.data?.msg) {
      error.message = error.data.msg;
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/">Go Back</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <section className="property-page flex flex-col md:flex-row gap-4">
      <div className="property-details">
        <Avatar className="w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-none">
          <AvatarImage
            className="object-cover"
            src={property?.propertyImage || profilejpg}
            alt="Property Image"
          />
          <AvatarFallback className="rounded-none text-4xl uppercase">
            PI
          </AvatarFallback>
        </Avatar>
        <p className="property-title">{property?.name}</p>
        <div className="property-location">
          {/* <img src={location} alt="logo" /> */}
          <span>{property?.location}</span>
        </div>
        <div className="property-price">
          {property?.price ? property.price : "Price not mentioned "}
        </div>
        <div className="property-description">{property?.description}</div>
      </div>
      <div className="property-features">
        <div className="property-wrapper">
          <p className="title">Status</p>
          <div className="status">
            <div className="feature">
              <div className="statusText">
                <span>{property?.status}</span>
              </div>
            </div>
            <div className="feature">
              <div className="statusText">
                <span>{property?.furnishStatus}</span>
              </div>
            </div>
          </div>
          <p className="title">Carpet Area</p>
          <div className="status">
            <div className="featureText">
              <span>
                {property?.carpetArea
                  ? property.carpetArea + " sq.ft."
                  : "Carpet area not mentioned"}
              </span>
            </div>
          </div>
          <CardHeader className="mt-5 pl-1">
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              Owner Profile
              <div className="flex items-center gap-2">
                {property.owned && (
                  <Badge className="capitalize">Owned by you</Badge>
                )}

                <Badge className="bg-green-600 hover:bg-green-600 capitalize">
                  {`${property.applications.length} tenant applied`}
                </Badge>
              </div>
            </CardTitle>
            <Avatar className="m-auto mt-5 w-[200px] h-[200px]">
              <AvatarImage
                className="object-cover"
                src={property.landlord.profileImage}
                alt={`@${property.landlord.name}`}
              />
              <AvatarFallback className="text-4xl bg-white">
                {property.landlord.name.charAt().toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <span className="font-semibold">Contact:</span>
              <Link href={`mailto:${property.landlord.email}`}>
                {property.landlord.email}
              </Link>
            </div>
          </CardContent>
          {!property.owned && (
            <CardFooter className="grid gap-4">
              <BookPropertyButton
                isSubmitted={property.isApplicationSubmitted}
                propertyId={property._id}
              />
            </CardFooter>
          )}
        </div>
      </div>
    </section>
  );
}
