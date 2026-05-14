import React from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const FormikDatePicker = ({ name }: { name: string }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className="relative w-full">
      <DatePicker
        selected={field.value}
        onChange={(val: Date | null) => setFieldValue(name, val)}
        dateFormat="dd/MM/yyyy"
        className="w-[576] h-[48px] bg-inputs border-none rounded-[12px] px-[20px] text-[var(--color-dark)] font-medium outline-none"
        placeholderText="Booking date"
        popperPlacement="bottom"
        calendarStartDay={1}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between px-3 py-2 bg-white rounded-t-xl border-b border-[var(--color-border)]">
            <button type="button" onClick={decreaseMonth} className="text-[var(--color-main)] text-xl">‹</button>
            <span className="text-[var(--color-dark)] font-semibold">{format(date, "MMMM yyyy")}</span>
            <button type="button" onClick={increaseMonth} className="text-[var(--color-main)] text-xl">›</button>
          </div>
        )}
      />
    </div>
  );
};

export default function BookingForm() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[640px] p-[32px] bg-white border border-gray-light rounded-[10px]">
        
        <h2 className="text-[20px] leading-[1.2] font-semibold text-main mb-[8px]">
          Book your car now
        </h2>
        
        <p className="text-[16px] leading-[1.25] font-medium text-gray-custom mb-[24px]">
          Stay connected with every adventure and choose your perfect car today.
        </p>

        <Formik
          initialValues={{ name: "", email: "", bookingDate: null, comment: "" }}
          onSubmit={(values) => console.log(values)}
        >
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