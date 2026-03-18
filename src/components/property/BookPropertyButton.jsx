import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCreateApplicationMutation } from "../../hooks/application/useCreateApplication";
import useSinglePropertyPage from "../../hooks/properties/useSinglePropertyPage";

function BookPropertyButton() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property } = useSinglePropertyPage({ id });
  const propertyId = property?._id;
  const isSubmitted = property?.isApplicationSubmitted;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);

  const {
    mutate: createApplication,
    isLoading: createApplicationIsLoading,
    isSuccess: createApplicationIsSuccess,
  } = useCreateApplicationMutation();

  const handleBookProperty = () => {
    if (!isLoggedIn) {
      return navigate("auth/login");
    }
    if (role === "landlord") {
      return toast.error("Please login as a tenant to book a property");
    }

    try {
      createApplication({ id: propertyId });
      toast.success("Property booked successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book the property"
      );
    }
  };

  return (
    <Button
      type="button"
      variant="default"
      onClick={handleBookProperty}
      disabled={isSubmitted || createApplicationIsSuccess}
      className="mt-4 bg-[#fccf5d] text-black rounded-md cursor-pointer w-full hover:scale-105 px-4 py-2 disabled:opacity-50"
    >
      {createApplicationIsLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {createApplicationIsSuccess || isSubmitted ? "Booked" : "Book Property"}
    </Button>
  );
}

export default BookPropertyButton;
