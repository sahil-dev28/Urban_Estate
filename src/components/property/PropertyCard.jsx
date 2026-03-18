import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Link } from "react-router";

function PropertyCard({ property }) {
  console.log(property);
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="h-[180px] w-full overflow-hidden">
        <img
          className="h-fu ll w-full object-cover"
          src={property.propertyImage}
          alt={property.name}
        />
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="capitalize">
            {property.location}
          </Badge>
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

        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">
            {property.price ? property.price : "Price not mentioned"} |
            {property.carpetArea
              ? `${property.carpetArea} sq.ft.`
              : "Carpet area not mentioned"}
          </span>
        </p>

        <CardDescription className="line-clamp-2">
          {property.description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/property/${property._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
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
