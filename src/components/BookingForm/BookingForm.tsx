import React from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { placeBooking } from "@/api/carsApi";
import { toast } from "react-toastify";

const FormikDatePicker = ({ name }: { name: string }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className="relative w-full">
      <DatePicker
        selected={field.value}
        onChange={(val: Date | null) => setFieldValue(name, val)}
        dateFormat="dd/MM/yyyy"
        className="w-[576] h-[48px] bg-inputs border-none rounded-[12px] px-[20px] text-main font-medium outline-none"
        placeholderText="Booking date"
        popperPlacement="bottom"
        calendarStartDay={1}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between px-3 py-2 bg-white rounded-t-xl border-b border-btn">
            <button
              type="button"
              onClick={decreaseMonth}
              className="text-btn text-xl"
            >
              ‹
            </button>
            <span className="text-main font-semibold">
              {format(date, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={increaseMonth}
              className="text-btn text-xl"
            >
              ›
            </button>
          </div>
        )}
      />
    </div>
  );
};

interface BookingFormProps {
  carId: string;
}
type BookingFormValues = {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
};

const initialValues: BookingFormValues = {
  name: "",
  email: "",
  bookingDate: null,
  comment: "",
};

export default function BookingForm({ carId }: BookingFormProps) {
  const handleSubmit = async(
    values: BookingFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
    await placeBooking(carId, {
      name: values.name,
      email: values.email,
      comment: values.comment,
    });
    toast.success(`Booking request is sent. We will contact you at ${values.email}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    resetForm();
  } catch {
    toast.error('Error. Please try later.');
  }
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[640px] p-[32px] bg-white border border-gray-light rounded-[10px]">
        <h2 className="text-[20px] leading-[1.2] font-semibold text-main mb-[8px]">
          Book your car now
        </h2>

        <p className="text-[16px] leading-[1.25] font-medium text-gray-custom mb-[24px]">
          Stay connected with every adventure and choose your perfect car today.
        </p>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col">
            <Field
              name="name"
              placeholder="Name*"
              className="w-full h-[48px] bg-inputs rounded-[12px] px-[20px] mb-[16px] outline-none text-main font-medium placeholder:text-gray-custom"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className="w-full h-[48px] bg-inputs rounded-[12px] px-[20px] mb-[16px] outline-none text-main font-medium placeholder:text-gray-custom "
            />

            <div className="mb-[16px]">
              <FormikDatePicker name="bookingDate" />
            </div>

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className="w-full h-[88px] bg-inputs rounded-[12px] px-[20px] py-[16px] mb-[24px] outline-none text-main font-medium placeholder:text-gray-custom resize-none "
            />

            <button
              type="submit"
              className="w-[156px] h-[44px] mx-auto bg-btn hover:bg-btn-hover text-white font-semibold rounded-[12px] transition-colors duration-200"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
