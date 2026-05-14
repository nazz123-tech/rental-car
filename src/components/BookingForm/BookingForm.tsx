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
        className="w-[576] bg-inputs border-none rounded-xl px-4 py-4 text-gray"
        placeholderText="Booking date"
        popperPlacement="bottom"
        calendarStartDay={1}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between px-3 pt-3 bg-white rounded-t-2xl">
            <button type="button" onClick={decreaseMonth} className="text-blue-500 text-2xl font-light">‹</button>
            <span className="text-gray-800 font-bold">{format(date, "MMMM yyyy")}</span>
            <button type="button" onClick={increaseMonth} className="text-blue-500 text-2xl font-light">›</button>
          </div>
        )}
      />
    </div>
  );
};

export default function BookingForm() {
  return (
    <div className="flex justify-center items-center ">
      <div className="p-8 rounded-[32px] bg-white w-[640] border border-gray-light">
        <h2 className="text-xl font-medium mb-6 text-gray-900">Book your car now</h2>

        <Formik
          initialValues={{ name: "", email: "", bookingDate: null, comment: "" }}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="flex flex-col gap-4">

            <Field
              name="name"
              placeholder="Name*"
              className="w-full bg-inputs rounded-xl px-5 py-4 outline-none  text-gray-600 placeholder:text-gray"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className="w-full bg-inputs rounded-xl px-5 py-4 outline-none  text-gray-600 placeholder:text-gray"
            />


            <FormikDatePicker name="bookingDate" />


            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              rows={4}
              className="w-full bg-inputs rounded-xl px-5 py-4 outline-none  text-gray-600 placeholder:text-gray placeholder:text-gray-400  resize-none"
            />

  
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-3 px-16 rounded-2xl transition-all shadow-md active:scale-95"
              >
                Send
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}