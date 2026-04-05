import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "../../components/ui/select";
import { Store, MapPin, LayoutGrid, ArrowLeft, CheckCircle2 } from "lucide-react";

const validationSchema = Yup.object({
  storeName: Yup.string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  storeType: Yup.string().required("Store type is required"),
  storeAddress: Yup.string().optional(),
});

const storeTypes = [
  { value: "retail", label: "Retail Store" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "grocery", label: "Grocery Store" },
  { value: "electronics", label: "Electronics Store" },
  { value: "clothing", label: "Clothing Store" },
  { value: "other", label: "Other" },
];

const StoreDetailsForm = ({ initialValues, onSubmit, onBack }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, touched, errors, setFieldValue, values }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="storeName"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Store Name
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Store className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Input}
                type="text"
                id="storeName"
                name="storeName"
                className={`pl-10 pr-3 ${touched.storeName && errors.storeName ? "border-destructive" : ""
                  }`}
                placeholder="Enter your store name"
              />
            </div>

            <ErrorMessage
              name="storeName"
              component="div"
              className="text-destructive text-sm mt-2 flex items-center"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="storeType"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Store Type
            </label>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <LayoutGrid className="h-5 w-5 text-muted-foreground" />
              </div>

              <Select
                value={values.storeType}
                onValueChange={(val) => setFieldValue("storeType", val)}
              >
                <SelectTrigger
                  id="storeType"
                  className={`w-full pl-10 ${touched.storeType && errors.storeType
                      ? "border-destructive"
                      : ""
                    }`}
                >
                  <SelectValue placeholder="Select store type" />
                </SelectTrigger>

                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Store Types</SelectLabel>
                    {storeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <ErrorMessage
              name="storeType"
              component="div"
              className="text-destructive text-sm mt-2 flex items-center"
            />
          </div>

          <div>
            <label
              htmlFor="storeAddress"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Store Address{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>

            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none z-10">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Textarea}
                id="storeAddress"
                name="storeAddress"
                rows={3}
                className={`pl-10 pr-3 resize-none ${touched.storeAddress && errors.storeAddress
                    ? "border-destructive"
                    : ""
                  }`}
                placeholder="Enter your store address"
              />
            </div>

            <ErrorMessage
              name="storeAddress"
              component="div"
              className="text-destructive text-sm mt-2 flex items-center"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 py-3 text-base font-semibold rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.02]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex-1 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Complete Setup
                </div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StoreDetailsForm;