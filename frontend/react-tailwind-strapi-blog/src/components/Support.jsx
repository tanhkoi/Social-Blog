// eslint-disable-next-line no-unused-vars
import React from "react";

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-[#02044A] w-full text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Support Center</h1>
        <p className="mt-2 text-gray-300">
          We’re here to help you. Explore our resources or get in touch.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-[#02044A]">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="mt-6 space-y-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg">
                How do I create an account?
              </h3>
              <p className="mt-2 text-gray-600">
                You can create an account by going to the SignUp page and
                filling out the required information. A confirmation email will
                be sent to verify your account.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg">
                How do I reset my password?
              </h3>
              <p className="mt-2 text-gray-600">
                Go to the Login page and click on Forgot Password? Youll receive
                an email with instructions to reset your password.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg">
                How do I report inappropriate content?
              </h3>
              <p className="mt-2 text-gray-600">
                You can report content by clicking the Report button next to any
                post or comment. Our team will review the report and take
                appropriate action.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-[#02044A]">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Still need help? Get in touch with our support team.
          </p>
          <form className="mt-6 bg-white shadow-md rounded-lg p-6 space-y-4 max-w-lg mx-auto">
            <div>
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Support;
