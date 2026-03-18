import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PropertyFilterCard() {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
          <div className="flex flex-col space-y-2">
            <Label to="search">Search</Label>
            <Input id="search" placeholder="Search by name or description" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label to="status">Status</Label>
            <Select>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label to="furniture-status">Furniture Status</Label>
            <Select>
              <SelectTrigger id="furniture-status" className="w-full">
                <SelectValue placeholder="Select furniture type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="furnished">Furnished</SelectItem>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label to="sort">Sort by</Label>
            <Select>
              <SelectTrigger id="sort" className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="date-asc">Date: Oldest First</SelectItem>
                <SelectItem value="date-desc">Date: Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="destructive"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyFilterCard;
