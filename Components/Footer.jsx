import React from "react";

const Footer = () => {
  const productList = ["Market", "ER20 Token", "Donation"];
  const contactList = ["nitinvishwakarmaaa@gmail.com", "info@example.com", "Contact Us"];
  const usefulLinks = ["Home", "About Us", "Company Bio"];

  return (
    <footer className="text-white bg-[#1a1a1a]">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" >
          
          {/* LEFT SECTION - CryptoCurrency */}
          <div >
            <h6 className="mb-4 font-semibold uppercase">
              CryptoCurrency
            </h6>
            <p className="text-gray-400">
              We are a cryptocurrency company that provides a secure and
              user-friendly platform for buying, selling, and trading digital assets.
              Our mission is to make cryptocurrency accessible to everyone and
              to help our users achieve their financial goals.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h6 className="mb-4 font-semibold uppercase">
              Products
            </h6>
            {productList.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* USEFUL LINKS */}
          <div className="bg-black text-center p-4 text-gray-400">
            <h6 className="mb-4 font-semibold uppercase">
              Useful Links
            </h6>
            {usefulLinks.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* CONTACT */}
          <div className="bg-black text-center p-4 text-white-400">
            <h6 className="mb-4 font-semibold uppercase">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  {el}
                </a>
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="bg-black text-center p-4 text-gray-400">
        © 2026 Copyright:{" "}
        <span className="text-white font-semibold">
          CryptoCurrency.com
        </span>
      </div>
    </footer>
  );
};

export default Footer;