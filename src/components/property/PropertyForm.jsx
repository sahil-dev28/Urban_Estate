import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyValidationSchema } from "../../schemas/index";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyImageUploader } from "./PropertyImage";
import { useCreatePropertyMutation } from "../../hooks/properties/useCreatePropertyMutation";
import { useEffect } from "react";

import { useUpdatePropertyMutation } from "../../hooks/properties/useUpdatePropertyMutation";

const DEFAULT_VALUES = {
  name: "",
  description: "",
  location: "",
  furnishStatus: "",
  carpetArea: "",
  price: "",
  status: "",
  propertyImage: null,
};

function PropertyForm(props) {
  const { open, onToggle, currentEditProperty } = props;

  const { mutateAsync: createProperty, isPending: createPropertyIsPending } =
    useCreatePropertyMutation();
  const { mutateAsync: updateProperty, isPending: updatePropertyIsPending } =
    useUpdatePropertyMutation();

  const isEditMode = !!currentEditProperty._id;
  const isSaving = createPropertyIsPending || updatePropertyIsPending;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (currentEditProperty._id) {
      reset({
        name: currentEditProperty?.name || "",
        description: currentEditProperty?.description || "",
        location: currentEditProperty?.location || "",
        furnishStatus: currentEditProperty?.furnishStatus || "",
        carpetArea: currentEditProperty?.carpetArea || "",
        price: currentEditProperty?.price || "",
        status: currentEditProperty?.status || " ",
        propertyImage: currentEditProperty?.propertyImage,
      });
    } else {
      reset({
        name: "",
        description: "",
        location: "",
        furnishStatus: "",
        carpetArea: "",
        price: "",
        status: "",
        propertyImage: null,
      });
    }
  }, [currentEditProperty, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const propertyDetails = structuredClone(data);

    // for (const [key, value] of Object.entries(propertyDetails)) {
    //   if (value !== null) {
    //     if (key === "propertyImage" && value instanceof File) {
    //       formData.append(key, value);
    //     } else if (key !== "propertyImage") {
    //       formData.append(key, value);
    //     }
    //   }
    // }

    for (const key in propertyDetails) {
      if ((propertyDetails, key)) {
        const value = propertyDetails[key];
        if (isEditMode) {
          if (DEFAULT_VALUES[key] !== propertyDetails[key]) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      }
    }

    if (isEditMode) {
      updateProperty({
        id: currentEditProperty._id,
        details: formData,
      })
        .then(() => {
          console.log("Property updated:");
          reset();
          onToggle(false);
        })
        .catch((error) => {
          console.error("Error updating property:", error);
        });

      return;
    } else {
      createProperty(formData)
        .then(() => {
          reset();
          onToggle(false);
        })
        .catch((error) => {
          console.error("Error creating property:", error);
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:scale-105">
          <Plus className="h-4 w-4" />
          Create New Property
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Property" : "Add New Property"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4 py-2 pb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 max-h-[500px] overflow-y-auto">
            <div className="space-y-1">
              <Label htmlFor="propertyImage">Property Image</Label>

              <Controller
                control={control}
                name="propertyImage"
                render={({ field: { value, onChange } }) => (
                  <PropertyImageUploader
                    // image={DEFAULT_VALUES.propertyImage}
                    // name={DEFAULT_VALUES.name}
                    value={value}
                    onChange={onChange}
                    maxFileSize="4MB"
                    acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
                  />
                )}
              />
              <p className="text-red-700 text-sm">
                {errors.propertyImage?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Property Name"
                {...register("name", { required: "Property name is required" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">{errors.name?.message}</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Property Description"
                {...register("description", {
                  required: "Property description is required",
                })}
                aria-invalid={errors.description ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">
                {errors.description?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Property Location"
                {...register("location", {
                  required: "Property location is required",
                })}
                aria-invalid={errors.location ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">{errors.location?.message}</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="furnishStatus">Furnish Status</Label>
              <Controller
                name="furnishStatus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="furnishStatus" className="w-full">
                      <SelectValue placeholder="Select Furnish Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-700 text-sm">
                {errors.furnishStatus?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="carpetArea">Carpet Area (sq ft)</Label>
              <Input
                type="number"
                id="carpetArea"
                placeholder="Carpet Area"
                {...register("carpetArea", {
                  valueAsNumber: true,
                  required: "Carpet area is required",
                })}
                aria-invalid={errors.carpetArea ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">
                {errors.carpetArea?.message}
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Property Price"
                {...register("price", {
                  valueAsNumber: true,
                  required: "Property price is required",
                })}
                aria-invalid={errors.price ? "true" : "false"}
              />
              <p className="text-red-700 text-sm">{errors.price?.message}</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-700 text-sm">{errors.status?.message}</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={isSaving}
              type="submit"
              className="cursor-pointer hover:scale-105"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEditMode ? "Save Changes" : "Create Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyForm;
