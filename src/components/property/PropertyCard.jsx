import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler } from "lucide-react";

import { Link } from "react-router";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property._id}`} className="property-card-link">
      <Card className="property-card h-full gap-0 overflow-hidden py-0">
        <div className="property-card-image">
          <img src={property.propertyImage} alt={property.name} />
          <Badge
            className={`property-card-status text-white capitalize ${
              property.status === "open" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {property.status}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-base font-semibold">
              {property.name}
            </h3>
            <Badge variant="secondary" className="capitalize">
              {property.furnishStatus}
            </Badge>
          </div>

          <p className="flex items-center gap-1 text-sm text-gray-500 capitalize">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </p>

          <p className="line-clamp-2 text-sm text-gray-500">
            {property.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="property-card-price">
              {property.price
                ? "₹ " + property.price.toLocaleString("en-IN")
                : "Price on request"}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Ruler className="h-4 w-4" />
              {property.carpetArea ? `${property.carpetArea} sq.ft.` : "—"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default PropertyCard;

// <Card className="w-full grid">
//   <CardHeader className="grid gap-2">
//     <Avatar className="w-full h-[150px] flex items-center justify-center rounded">
//       <AvatarImage
//         className="object-cover"
//         src={property.propertyImage}
//         alt={`@${property.name}`}
//       />
//     </Avatar>
//     <CardTitle>{property.name}</CardTitle>
//     <span className="flex items-center gap-2">
//       <Badge variant="outline" className="capitalize">
//         {property.location}
//       </Badge>
//       <Badge
//         className={`${
//           property.status === "open"
//             ? "bg-green-600 hover:bg-green-600"
//             : "bg-red-600 hover:bg-red-600"
//         } capitalize`}
//       >
//         {property.status}
//       </Badge>
//       <Badge className="capitalize">{property.furnishStatus}</Badge>
//     </span>
//     <span className="text-sm text-muted-foreground">{`${
//       property.price ? property.price : "Price not mentioned"
//     } | ${
//       property.carpetArea
//         ? `${property.carpetArea} sq.ft.`
//         : "sq.ft. not mentioned"
//     }`}</span>
//     <CardDescription>{property.description}</CardDescription>
//   </CardHeader>
//   <CardFooter className="flex justify-between">
//     <Button variant="outline" className="w-full" asChild>
//       <Link href={`/property/${property._id}`}>View Description</Link>
//     </Button>
//   </CardFooter>
// </Card>
