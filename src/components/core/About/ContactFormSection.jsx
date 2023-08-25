import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div>
      <h1 className="mb-3 text-center text-4xl font-semibold text-richblack-5">
        Get in Touch
      </h1>
      <p className="mb-8 text-richblack-300 font-medium text-base text-center">
        We’d love to here for you, Please fill out this form.
      </p>
      <ContactUsForm />
    </div>
  );
};

export default ContactFormSection;
