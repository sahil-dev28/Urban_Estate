import "./PropertyPage.css";
import profilejpg from "../../../src/assets/noavatar.jpg";
import { Mail, MapPin, Ruler, Sofa, Users } from "lucide-react";

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

  if (isLoading) {
    return <PropertyLoading />;
  }

  if (error) {
    const message = error.response?.data?.msg || "Something went wrong!";

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/property">Back to properties</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const applicationsCount = property.applications.length;

  return (
    <section className="property-page">
      <div className="property-details">
        <div className="property-hero">
          <img src={property.propertyImage || profilejpg} alt={property.name} />
        </div>

        <div className="property-heading">
          <div>
            <h1 className="property-title">{property.name}</h1>
            <p className="property-location">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </p>
          </div>
          <div className="property-price">
            {property.price
              ? "₹ " + property.price.toLocaleString("en-IN")
              : "Price on request"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            className={`text-white capitalize ${
              property.status === "open" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {property.status}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {property.furnishStatus}
          </Badge>
        </div>

        <div className="property-info-grid">
          <div className="property-info">
            <Ruler />
            <div>
              <span>Carpet Area</span>
              <strong>
                {property.carpetArea
                  ? property.carpetArea + " sq.ft."
                  : "Not mentioned"}
              </strong>
            </div>
          </div>
          <div className="property-info">
            <Sofa />
            <div>
              <span>Furnishing</span>
              <strong className="capitalize">{property.furnishStatus}</strong>
            </div>
          </div>
          <div className="property-info">
            <Users />
            <div>
              <span>Applications</span>
              <strong>{applicationsCount}</strong>
            </div>
          </div>
        </div>

        <div>
          <h2 className="property-section-title">About this property</h2>
          <p className="property-description">{property.description}</p>
        </div>
      </div>

      <aside className="property-features">
        <Card className="property-owner-card">
          <CardHeader className="text-center">
            <Avatar className="mx-auto h-24 w-24">
              <AvatarImage
                className="object-cover"
                src={property.landlord.profileImage}
                alt={`@${property.landlord.name}`}
              />
              <AvatarFallback className="bg-[var(--cream)] text-3xl">
                {property.landlord.name.charAt().toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-3 text-lg">
              {property.landlord.name}
            </CardTitle>
            <CardDescription>Property Owner</CardDescription>
            {property.owned && (
              <Badge className="mx-auto mt-1">Owned by you</Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            <a
              href={`mailto:${property.landlord.email}`}
              className="property-contact"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>{property.landlord.email}</span>
            </a>
            <p className="text-center text-sm text-muted-foreground">
              {`${applicationsCount} tenant${applicationsCount !== 1 ? "s" : ""} applied`}
            </p>
          </CardContent>

          {!property.owned && (
            <CardFooter>
              <BookPropertyButton />
            </CardFooter>
          )}
        </Card>
      </aside>
    </section>
  );
}
