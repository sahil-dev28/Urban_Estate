import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
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
    isPending: createApplicationIsPending,
    isSuccess: createApplicationIsSuccess,
  } = useCreateApplicationMutation();

  const isBooked = isSubmitted || createApplicationIsSuccess;

  const handleBookProperty = () => {
    if (!isLoggedIn) {
      return navigate("/auth/login");
    }
    if (role === "landlord") {
      return toast.error("Please login as a tenant to book a property");
    }

    createApplication({ id: propertyId });
  };

  return (
    <Button
      type="button"
      onClick={handleBookProperty}
      disabled={isBooked || createApplicationIsPending}
      className="w-full h-11 text-base font-semibold cursor-pointer hover:scale-105 disabled:opacity-50"
    >
      {createApplicationIsPending && <Loader2 className="h-4 w-4 animate-spin" />}
      {isBooked ? "Booked" : "Book Property"}
    </Button>
  );
}

export default BookPropertyButton;
