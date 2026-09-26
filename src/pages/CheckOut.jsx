import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Tag,
  User,
  Loader2,
  AlertCircle,
  Download,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

/* =========================================================
   API CONFIG
========================================================= */

/*
 * Same-origin deployment:
 *
 * Frontend:
 * https://tresco.firm.in
 *
 * Backend:
 * https://tresco.firm.in/api/...
 *
 * Empty string means same origin.
 */
const API_URL = "";

const RAZORPAY_KEY =
  import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

const USD_TO_INR_RATE = Number(
  import.meta.env.VITE_USD_TO_INR_RATE || 90
);

const GUMROAD_FOCUS_URL =
  "https://lakshay622.gumroad.com/l/focus-control-for-your-exam-period?wanted=true";

/* =========================================================
   PRODUCT PRICES
========================================================= */

const PRODUCT_PRICES = {
  "how-to-attract-women": 19.99,
  "dopamine-detox": 15.99,
  "unlock-focus": 15.99,
};

/* =========================================================
   BUNDLE PRICES
========================================================= */

const BUNDLE_PRICE = 45.0;

/* =========================================================
   COUPONS
========================================================= */

const COUPON_RULE = {
  code: "PIR",
  rate: 0.1,
};

/* =========================================================
   COUNTRY + STATE DATA
========================================================= */

const COUNTRY_REGIONS = {
  India: [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],

  "United States (US)": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],

  "United Kingdom (UK)": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
  ],

  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],

  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
  ],

  "United Arab Emirates": [
    "Abu Dhabi",
    "Ajman",
    "Dubai",
    "Fujairah",
    "Ras Al Khaimah",
    "Sharjah",
    "Umm Al Quwain",
  ],

  Singapore: [
    "Central Region",
    "East Region",
    "North Region",
    "North-East Region",
    "West Region",
  ],

  Germany: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],

  France: [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Brittany",
    "Centre-Val de Loire",
    "Corsica",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandy",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
  ],

  Japan: [
    "Tokyo",
    "Osaka",
    "Kyoto",
    "Hokkaido",
    "Aomori",
    "Iwate",
    "Miyagi",
    "Akita",
    "Yamagata",
    "Fukushima",
    "Ibaraki",
    "Tochigi",
    "Gunma",
    "Saitama",
    "Chiba",
    "Kanagawa",
    "Niigata",
    "Toyama",
    "Ishikawa",
    "Fukui",
    "Yamanashi",
    "Nagano",
    "Gifu",
    "Shizuoka",
    "Aichi",
    "Mie",
    "Shiga",
    "Hyogo",
    "Nara",
    "Wakayama",
    "Tottori",
    "Shimane",
    "Okayama",
    "Hiroshima",
    "Yamaguchi",
    "Tokushima",
    "Kagawa",
    "Ehime",
    "Kochi",
    "Fukuoka",
    "Saga",
    "Nagasaki",
    "Kumamoto",
    "Oita",
    "Miyazaki",
    "Kagoshima",
    "Okinawa",
  ],
};

const COUNTRIES = Object.keys(COUNTRY_REGIONS);

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatCheckoutPrice(value, isIndia) {
  return isIndia
    ? formatINR(Number(value || 0) * USD_TO_INR_RATE)
    : formatPrice(value);
}

/* =========================================================
   FRONTEND DISPLAY PRICING
   Backend remains the final source of truth.
========================================================= */

function calculateDisplayPricing(
  cartItems,
  country,
  couponCode
) {
  const currency = "USD";

  const individualSubtotal = cartItems.reduce(
    (sum, item) => {
      const product =
        PRODUCT_PRICES[item.id];

      const itemPrice = product
        ? Number(product)
        : Number(item.price || 0);

      return sum + itemPrice;
    },
    0
  );

  const isBundle =
    cartItems.length === 3;

  const subtotal = isBundle
    ? BUNDLE_PRICE
    : individualSubtotal;

  const bundleSaving = isBundle
    ? Math.max(
        0,
        individualSubtotal - subtotal
      )
    : 0;

  const normalizedCoupon =
    String(couponCode || "")
      .trim()
      .toUpperCase();

  const couponValid =
    normalizedCoupon &&
    normalizedCoupon ===
      COUPON_RULE.code;

  const couponRate = couponValid
    ? COUPON_RULE.rate
    : 0;

  const discount =
    subtotal * couponRate;

  const total = Math.max(
    0,
    subtotal - discount
  );

  return {
    currency,
    individualSubtotal,
    isBundle,
    subtotal,
    bundleSaving,
    couponCode: couponValid
      ? normalizedCoupon
      : null,
    couponRate,
    discount,
    total,
  };
}

/* =========================================================
   CHECKOUT
========================================================= */

function Checkout() {
  const {
    cartItems,
    cartCount,
    clearCart,
  } = useCart();

  const [couponOpen, setCouponOpen] =
    useState(false);

  const [couponCode, setCouponCode] =
    useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState("");

  const [couponError, setCouponError] =
    useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    email: "",
    notes: "",
  });

  const isIndia =
    form.country.trim().toLowerCase() === "india";

  const [agree, setAgree] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [paymentError, setPaymentError] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  /* ======================================================
     SUCCESS STATE
  ====================================================== */

  const [success, setSuccess] =
    useState(false);

  const [paymentId, setPaymentId] =
    useState("");

  const [orderNumber, setOrderNumber] =
    useState("");

  const [purchasedItems, setPurchasedItems] =
    useState([]);

  const [downloads, setDownloads] =
    useState([]);

  const [paidCurrency, setPaidCurrency] =
    useState("USD");

  /* ======================================================
     CURRENCY
  ====================================================== */

  const currency = "USD";

  /* ======================================================
     DISPLAY PRICING
  ====================================================== */

  const pricing = useMemo(
    () =>
      calculateDisplayPricing(
        cartItems,
        "",
        appliedCoupon
      ),
    [
      cartItems,
      appliedCoupon,
    ]
  );

  const {
    individualSubtotal,
    isBundle,
    subtotal,
    bundleSaving,
    discount,
    total,
  } = pricing;

  /* ======================================================
     AVAILABLE REGIONS
  ====================================================== */

  const availableRegions =
    COUNTRY_REGIONS[form.country] || [];

  /* ======================================================
     LOAD RAZORPAY SCRIPT
  ====================================================== */

  useEffect(() => {
    if (window.Razorpay) {
      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (
        document.body.contains(script)
      ) {
        document.body.removeChild(script);
      }
    };
  }, []);

  /* ======================================================
     UPDATE FORM
  ====================================================== */

  const update = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setPaymentError("");
  };

  /* ======================================================
     UPDATE COUNTRY
  ====================================================== */

  const updateCountry = (
    country
  ) => {
    setForm((prev) => ({
      ...prev,
      country,
      state: "",
    }));

    /* Reset coupon whenever country changes. */
    setCouponCode("");
    setAppliedCoupon("");
    setCouponError("");

    setErrors((prev) => ({
      ...prev,
      country: "",
      state: "",
    }));

    setPaymentError("");
  };

  /* ======================================================
     VALIDATION
  ====================================================== */

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) {
      next.firstName =
        "First name is required";
    }

    if (!form.lastName.trim()) {
      next.lastName =
        "Last name is required";
    }

    if (!form.country) {
      next.country =
        "Country is required";
    }

    if (!form.state.trim()) {
      next.state =
        "State / region is required";
    }

    if (!form.email.trim()) {
      next.email =
        "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      next.email =
        "Enter a valid email address";
    }

    if (!agree) {
      next.agree =
        "Please accept the terms and conditions";
    }

    setErrors(next);

    return (
      Object.keys(next).length === 0
    );
  };

  /* ======================================================
     APPLY COUPON
  ====================================================== */

  const applyCouponCode = () => {
    const code =
      couponCode
        .trim()
        .toUpperCase();

    if (!code) {
      setCouponError(
        "Enter a coupon code."
      );
      return;
    }

    if (code !== COUPON_RULE.code) {
      setAppliedCoupon("");
      setCouponError(
        "Invalid coupon. Use PIR."
      );
      return;
    }

    setAppliedCoupon(code);
    setCouponError("");
    setPaymentError("");
    setCouponOpen(false);
  };

  /* ======================================================
     LOAD RAZORPAY
  ====================================================== */

  const loadRazorpay = () => {
    return new Promise(
      (resolve, reject) => {
        if (window.Razorpay) {
          resolve();
          return;
        }

        let tries = 0;

        const interval =
          setInterval(() => {
            tries++;

            if (
              window.Razorpay
            ) {
              clearInterval(interval);
              resolve();
              return;
            }

            if (tries > 50) {
              clearInterval(interval);

              reject(
                new Error(
                  "Razorpay could not be loaded."
                )
              );
            }
          }, 100);
      }
    );
  };

  /* ======================================================
     PAYPAL — CREATE ORDER
  ====================================================== */

  const handlePayPalCreateOrder = async () => {
    setPaymentError("");

    if (!PAYPAL_CLIENT_ID) {
      const message = "PayPal is not configured. Please add VITE_PAYPAL_CLIENT_ID to the frontend .env file.";
      setPaymentError(message);
      throw new Error(message);
    }

    if (!cartItems.length) {
      setPaymentError("Your cart is empty.");
      throw new Error("Your cart is empty.");
    }

    if (!validate()) {
      setPaymentError(
        "Please complete all required billing details."
      );
      throw new Error(
        "Please complete all required billing details."
      );
    }

    try {
      setProcessing(true);

      const response = await fetch(
        `${API_URL}/api/paypal/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              id: item.id,
            })),

            couponCode:
              appliedCoupon || null,

            customer: {
              firstName:
                form.firstName.trim(),

              lastName:
                form.lastName.trim(),

              email:
                form.email
                  .trim()
                  .toLowerCase(),

              country:
                form.country,

              state:
                form.state.trim(),

              notes:
                form.notes.trim(),
            },
          }),
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The PayPal server returned an invalid response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to create PayPal order."
        );
      }

      const paypalOrderId =
        result.order?.id ||
        result.paypalOrderId ||
        result.id;

      if (!paypalOrderId) {
        throw new Error(
          "PayPal order was not created correctly."
        );
      }

      return paypalOrderId;
    } catch (error) {
      console.error(
        "PayPal create order error:",
        error
      );

      setPaymentError(
        error.message ||
          "Unable to create PayPal order."
      );

      throw error;
    } finally {
      setProcessing(false);
    }
  };

  /* ======================================================
     PAYPAL — CAPTURE ORDER
  ====================================================== */

  const handlePayPalApprove = async (data) => {
    setPaymentError("");

    try {
      setProcessing(true);

      if (!data?.orderID) {
        throw new Error(
          "PayPal order ID was not returned."
        );
      }

      const response = await fetch(
        `${API_URL}/api/paypal/capture-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            paypalOrderId:
              data.orderID,
          }),
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The PayPal server returned an invalid response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "PayPal payment verification failed."
        );
      }

      setPaymentId(
        result.payment_id ||
          result.capture_id ||
          data.orderID ||
          ""
      );

      setOrderNumber(
        result.orderNumber || ""
      );

      setPaidCurrency(
        result.currency || "USD"
      );

      setPurchasedItems(
        result.items || []
      );

      setDownloads(
        result.downloads || []
      );

      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error(
        "PayPal capture error:",
        error
      );

      setPaymentError(
        error.message ||
          "PayPal payment verification failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  /* ======================================================
     PAYPAL — ERROR
  ====================================================== */

  const handlePayPalError = (error) => {
    console.error(
      "PayPal payment error:",
      error
    );

    setPaymentError(
      "PayPal payment could not be completed. Please try again."
    );

    setProcessing(false);
  };

  /* ======================================================
     GUMROAD DIRECT PURCHASE
  ====================================================== */

  const handleGumroadPurchase = () => {
    window.open(
      GUMROAD_FOCUS_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ======================================================
     PLACE ORDER
  ====================================================== */

  const handlePlaceOrder =
    async () => {
      setPaymentError("");

      if (!isIndia) {
        setPaymentError(
          "Please use PayPal for international orders."
        );
        return;
      }

      if (!cartItems.length) {
        setPaymentError(
          "Your cart is empty."
        );
        return;
      }

      if (!validate()) {
        setPaymentError(
          "Please complete all required billing details."
        );
        return;
      }

      try {
        setProcessing(true);

        /* ==================================================
           CREATE BACKEND ORDER
        ================================================== */

        const response =
          await fetch(
            `${API_URL}/api/payment/create-order`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
                Accept:
                  "application/json",
              },

              /*
               * Backend always processes payments in USD.
               */
              body: JSON.stringify({
                items:
                  cartItems.map(
                    (item) => ({
                      id: item.id,
                    })
                  ),

                couponCode:
                  appliedCoupon || null,

                customer: {
                  firstName:
                    form.firstName.trim(),

                  lastName:
                    form.lastName.trim(),

                  email:
                    form.email
                      .trim()
                      .toLowerCase(),

                  country:
                    form.country,

                  state:
                    form.state.trim(),

                  notes:
                    form.notes.trim(),
                },
              }),
            }
          );

        /* ==================================================
           RESPONSE
        ================================================== */

        let result;

        try {
          result =
            await response.json();
        } catch {
          throw new Error(
            "The payment server returned an invalid response."
          );
        }

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Unable to create payment order."
          );
        }

        /* ==================================================
           PAID USD ORDER
           LOAD RAZORPAY
        ================================================== */

        if (!RAZORPAY_KEY) {
          throw new Error(
            "Razorpay is not configured. Please add VITE_RAZORPAY_KEY_ID to your .env file."
          );
        }

        await loadRazorpay();

        /* ==================================================
           RAZORPAY ORDER
        ================================================== */

        const razorpayOrder =
          result.order;

        const razorpayOrderId =
          razorpayOrder?.id;

        if (!razorpayOrderId) {
          throw new Error(
            "Payment order was not created correctly."
          );
        }

        /*
         * Backend is authoritative.
         */
        const razorpayCurrency =
          razorpayOrder?.currency || "INR";

        /* ==================================================
           OPEN RAZORPAY
        ================================================== */

        const razorpay =
          new window.Razorpay({
            key: RAZORPAY_KEY,

            amount:
              razorpayOrder.amount,

            currency:
              razorpayCurrency,

            name:
              "Business Playbook",

            description:
              cartCount === 3
                ? "Business Playbook — Complete Collection"
                : "Business Playbook Digital Product",

            order_id:
              razorpayOrderId,

            prefill: {
              name:
                `${form.firstName} ${form.lastName}`.trim(),

              email:
                form.email.trim(),
            },

            notes: {
              customer:
                `${form.firstName} ${form.lastName}`.trim(),

              email:
                form.email.trim(),

              country:
                form.country,

              state:
                form.state,

              currency:
                razorpayCurrency,
            },

            theme: {
              color:
                "#c6a15b",
            },

            modal: {
              ondismiss: () => {
                setProcessing(false);
              },
            },

            /* ================================================
               PAYMENT SUCCESS
            ================================================ */

            handler:
              async (payment) => {
                try {
                  /* ==========================================
                     VERIFY PAYMENT
                  ========================================== */

                  const verifyResponse =
                    await fetch(
                      `${API_URL}/api/payment/verify-payment`,
                      {
                        method: "POST",

                        headers: {
                          "Content-Type":
                            "application/json",
                          Accept:
                            "application/json",
                        },

                        body: JSON.stringify({
                          razorpay_order_id:
                            payment.razorpay_order_id,

                          razorpay_payment_id:
                            payment.razorpay_payment_id,

                          razorpay_signature:
                            payment.razorpay_signature,
                        }),
                      }
                    );

                  let verifyResult;

                  try {
                    verifyResult =
                      await verifyResponse.json();
                  } catch {
                    throw new Error(
                      "Payment verification server returned an invalid response."
                    );
                  }

                  if (
                    !verifyResponse.ok ||
                    !verifyResult.success
                  ) {
                    throw new Error(
                      verifyResult.message ||
                        "Payment verification failed."
                    );
                  }

                  /* ==========================================
                     PAYMENT INFORMATION
                  ========================================== */

                  setPaymentId(
                    verifyResult.payment_id ||
                      payment.razorpay_payment_id ||
                      ""
                  );

                  setOrderNumber(
                    verifyResult.orderNumber ||
                      ""
                  );

                  setPaidCurrency(
                    verifyResult.currency ||
                      razorpayCurrency
                  );

                  /* ==========================================
                     PURCHASED ITEMS
                  ========================================== */

                  setPurchasedItems(
                    verifyResult.items ||
                      []
                  );

                  /* ==========================================
                     DOWNLOAD LINKS
                  ========================================== */

                  setDownloads(
                    verifyResult.downloads ||
                      []
                  );

                  /* ==========================================
                     CLEAR CART
                  ========================================== */

                  clearCart();

                  setSuccess(true);
                } catch (error) {
                  console.error(
                    "Payment verification error:",
                    error
                  );

                  setPaymentError(
                    error.message ||
                      "Payment verification failed."
                  );
                } finally {
                  setProcessing(false);
                }
              },
          });

        /* ==================================================
           PAYMENT FAILED
        ================================================== */

        razorpay.on(
          "payment.failed",
          (response) => {
            console.error(
              "Razorpay payment failed:",
              response
            );

            setPaymentError(
              response?.error
                ?.description ||
                "Payment failed. Please try again."
            );

            setProcessing(false);
          }
        );

        razorpay.open();
      } catch (error) {
        console.error(
          "Create payment error:",
          error
        );

        setPaymentError(
          error.message ||
            "Something went wrong. Please try again."
        );

        setProcessing(false);
      }
    };

  /* ======================================================
     SUCCESS PAGE
  ====================================================== */

  if (success) {
    const successCurrency = paidCurrency || "USD";

    return (
      <div className="checkout-page">
        <CheckoutHeader />

        <div className="checkout-success">
          <div className="checkout-success-card">

            <div className="checkout-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="checkout-label">
              PAYMENT SUCCESSFUL
            </span>

            <h1>
              Thank you for
              <br />
              <em>your order.</em>
            </h1>

            <p>
              Your Business Playbook
              purchase has been confirmed.
              Your secure download links
              are ready below.
            </p>

            <div className="checkout-success-email">
              <Mail size={16} />
              {form.email}
            </div>

            {orderNumber && (
              <div className="checkout-payment-id">
                <span>
                  Order Number
                </span>

                <strong>
                  {orderNumber}
                </strong>
              </div>
            )}

            {paymentId && (
              <div className="checkout-payment-id">
                <span>
                  Payment ID
                </span>

                <strong>
                  {paymentId}
                </strong>
              </div>
            )}

            <div className="checkout-payment-id">
              <span>
                Currency
              </span>

              <strong>
                {successCurrency}
              </strong>
            </div>

 

            {purchasedItems.length > 0 && (
              <div
                className="checkout-downloads"
                style={{
                  marginTop: "28px",
                  width: "100%",
                }}
              >
                <span
                  className="checkout-label"
                  style={{
                    display: "block",
                    marginBottom:
                      "14px",
                  }}
                >
                  YOUR PURCHASE
                </span>

                {purchasedItems.map(
                  (item) => {
                    const download =
                      downloads.find(
                        (file) =>
                          String(
                            file.productId
                          ) ===
                          String(
                            item.product_id
                          )
                      );

                    return (
                      <div
                        key={item.id}
                        className="checkout-download-item"
                      >
                        <div className="checkout-download-info">
                          <strong>
                            {
                              item.product_name
                            }
                          </strong>

                          <span>
                            Digital download
                          </span>
                        </div>

                        {download?.url ? (
                          <a
                            href={
                              download.url
                            }
                            className="checkout-download-btn"
                            download
                          >
                            <Download
                              size={15}
                            />

                            DOWNLOAD
                          </a>
                        ) : (
                          <span className="checkout-download-unavailable">
                            DOWNLOAD
                            UNAVAILABLE
                          </span>
                        )}
                      </div>
                    );
                  }
                )}

                <div className="checkout-download-note">
                  <ShieldCheck
                    size={14}
                  />

                  <span>
                    Secure download links
                    are valid for 30 days
                    and allow up to 5
                    downloads per book.
                  </span>
                </div>
              </div>
            )}

            <Link
              to="/"
              className="checkout-success-btn"
            >
              <ArrowLeft size={16} />
              BACK TO SHOP
            </Link>

          </div>
        </div>
      </div>
    );
  }

  /* ======================================================
     EMPTY CART
  ====================================================== */

  if (!cartItems.length) {
    return (
      <div className="checkout-page">
        <CheckoutHeader />

        <div className="checkout-empty">
          <ShoppingBagIcon />

          <span className="checkout-label">
            YOUR CART
          </span>

          <h1>
            Your cart is
            <br />
            <em>empty.</em>
          </h1>

          <p>
            Add a Business Playbook
            product before proceeding
            to checkout.
          </p>

          <Link
            to="/"
            className="checkout-success-btn"
          >
            <ArrowLeft size={16} />
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  /* ======================================================
     PAYMENT METHOD TEXT
  ====================================================== */

  const paymentMethodsText = isIndia
    ? "UPI · Cards · Net Banking · Wallets"
    : "PayPal · International cards";

  const paymentDescription = isIndia
    ? `Secure INR payment through Razorpay. ${formatCheckoutPrice(total, true)}`
    : "Secure USD payment through PayPal.";

  /* ======================================================
     CHECKOUT PAGE
  ====================================================== */

  return (
    <div className="checkout-page">

      <CheckoutHeader />

      <main className="checkout-container">

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="checkout-navigation">

          <Link to="/">
            <ArrowLeft size={15} />
            Back to shop
          </Link>

          <div>
            <LockKeyhole size={14} />
            Secure checkout
          </div>

        </div>

        {/* =================================================
            COUPON
        ================================================= */}

        <div className="checkout-coupon-bar">

          <div className="checkout-coupon-question">

            <Tag size={16} />

            <span>
              Have a coupon?
            </span>

            {!appliedCoupon && (
              <button
                type="button"
                onClick={() =>
                  setCouponOpen(
                    !couponOpen
                  )
                }
              >
                Click here to enter
                your code

                <ChevronDown
                  size={14}
                  className={
                    couponOpen
                      ? "coupon-arrow-open"
                      : ""
                  }
                />
              </button>
            )}

            {appliedCoupon && (
              <span className="coupon-applied">
                {appliedCoupon} applied
              </span>
            )}

          </div>

          {couponOpen &&
            !appliedCoupon && (
              <div className="checkout-coupon-input">

                <input
                  value={couponCode}
                  onChange={(event) => {
                    setCouponCode(
                      event.target.value.toUpperCase()
                    );

                    setCouponError("");
                  }}
                  placeholder="PIR"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      event.preventDefault();
                      applyCouponCode();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={
                    applyCouponCode
                  }
                >
                  APPLY
                </button>

              </div>
            )}

          {couponError && (
            <div
              className="checkout-inline-error"
              style={{
                marginTop: "10px",
              }}
            >
              <AlertCircle size={14} />
              {couponError}
            </div>
          )}

        </div>

        <div className="checkout-or">
          <span>OR</span>
        </div>

        <div className="checkout-layout">

          {/* =================================================
              LEFT — BILLING
          ================================================= */}

          <section className="checkout-details">

            <div className="checkout-heading">

              <span className="checkout-label">
                BILLING DETAILS
              </span>

              <h1>
                Complete your
                <br />
                <em>order.</em>
              </h1>

            </div>

            {/* =============================================
                BILLING DETAILS
            ============================================= */}

            <div className="checkout-card">

              <div className="checkout-card-title">

                <span>01</span>

                <div>

                  <h2>
                    Billing details
                  </h2>

                  <p>
                    Please enter your
                    billing information.
                  </p>

                </div>

              </div>

              <div className="checkout-fields two">

                <CheckoutField
                  label="First name"
                  required
                  value={
                    form.firstName
                  }
                  onChange={(value) =>
                    update(
                      "firstName",
                      value
                    )
                  }
                  placeholder="First name"
                  icon={
                    <User size={14} />
                  }
                  error={
                    errors.firstName
                  }
                />

                <CheckoutField
                  label="Last name"
                  required
                  value={
                    form.lastName
                  }
                  onChange={(value) =>
                    update(
                      "lastName",
                      value
                    )
                  }
                  placeholder="Last name"
                  icon={
                    <User size={14} />
                  }
                  error={
                    errors.lastName
                  }
                />

              </div>

              <div className="checkout-fields two">

                <CheckoutSelect
                  label="Country / Region"
                  required
                  value={
                    form.country
                  }
                  onChange={
                    updateCountry
                  }
                  options={
                    COUNTRIES
                  }
                  placeholder="Select a country"
                  error={
                    errors.country
                  }
                />

                <CheckoutSelect
                  label="State / Province / Region"
                  required
                  value={
                    form.state
                  }
                  onChange={(value) =>
                    update(
                      "state",
                      value
                    )
                  }
                  options={
                    availableRegions
                  }
                  placeholder={
                    availableRegions.length
                      ? "Select a state / region"
                      : "Select a country first"
                  }
                  error={
                    errors.state
                  }
                />

              </div>

              <CheckoutField
                label="Email address"
                required
                type="email"
                value={
                  form.email
                }
                onChange={(value) =>
                  update(
                    "email",
                    value
                  )
                }
                placeholder="you@example.com"
                icon={
                  <Mail size={14} />
                }
                error={
                  errors.email
                }
              />

            </div>

            {/* =============================================
                ADDITIONAL INFORMATION
            ============================================= */}

            <div className="checkout-card">

              <div className="checkout-card-title">

                <span>02</span>

                <div>

                  <h2>
                    Additional
                    information
                  </h2>

                  <p>
                    Optional
                    information for
                    your order.
                  </p>

                </div>

              </div>

              <div className="checkout-field">

                <label>
                  Order notes{" "}
                  <small>
                    (optional)
                  </small>
                </label>

                <textarea
                  value={
                    form.notes
                  }
                  onChange={(event) =>
                    update(
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Notes about your order..."
                  rows="2"
                />

              </div>

            </div>

            {/* =============================================
                PAYMENT
            ============================================= */}

            <div className="checkout-card checkout-payment-card">

              <div className="checkout-card-title">

                <span>03</span>

                <div>

                  <h2>
                    Payment
                  </h2>

                  <p>
                    All payments are
                    securely processed.
                  </p>

                </div>

              </div>

              <div className="checkout-gateway">

                <div className="checkout-gateway-icon">
                  <CreditCard size={20} />
                </div>

                <div className="checkout-gateway-info">

                  <strong>
                    {isIndia
                      ? "Razorpay Secure Payment"
                      : "PayPal Secure Payment"}
                  </strong>

                  <span>
                    {paymentMethodsText}
                  </span>

                </div>

                <ShieldCheck size={19} />

              </div>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  opacity: 0.7,
                }}
              >
                {paymentDescription}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  padding: "18px",
                  border: "1px solid rgba(198, 161, 91, 0.25)",
                  borderRadius: "12px",
                  background: "rgba(198, 161, 91, 0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "15px", flexWrap: "wrap" }}>
                  <div>
                    <strong style={{ display: "block", marginBottom: "5px" }}>Focus Control for Your Exam Period</strong>
                    <span style={{ fontSize: "13px", opacity: 0.7 }}>Prefer Gumroad? Purchase this product directly there.</span>
                  </div>
                  <button type="button" onClick={handleGumroadPurchase} style={{ flexShrink: 0, border: "none", borderRadius: "8px", padding: "11px 16px", cursor: "pointer", fontWeight: 600 }}>BUY ON GUMROAD →</button>
                </div>
              </div>

              <label className="checkout-agreement">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => {

                    setAgree(
                      event.target.checked
                    );

                    setErrors(
                      (prev) => ({
                        ...prev,
                        agree: "",
                      })
                    );

                  }}
                />

                <span>

                  I have read and
                  agree to the
                  website{" "}

                  <Link to="/terms">
                    terms and
                    conditions
                  </Link>{" "}

                  and{" "}

                  <Link to="/privacy">
                    privacy policy
                  </Link>
                  .

                </span>

              </label>

              {errors.agree && (
                <div className="checkout-inline-error">

                  <AlertCircle size={14} />

                  {errors.agree}

                </div>
              )}

              {paymentError && (
                <div className="checkout-error">

                  <AlertCircle size={16} />

                  <span>
                    {paymentError}
                  </span>

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="checkout-order">

            <div className="checkout-order-header">

              <div>

                <span className="checkout-label">
                  YOUR ORDER
                </span>

                <h2>
                  Order summary
                </h2>

              </div>

              <span className="checkout-order-count">
                {cartCount}
              </span>

            </div>

            <div className="checkout-order-products">

              {cartItems.map(
                (item) => {

                  const productPrice =
                    PRODUCT_PRICES[item.id] ??
                    Number(item.price || 0);

                  return (
                    <div
                      className="checkout-order-product"
                      key={item.id}
                    >

                      <div className="checkout-order-image">

                        <img
                          src={
                            item.image ||
                            item.cover
                          }
                          alt={
                            item.title
                          }
                        />

                      </div>

                      <div className="checkout-order-name">

                        <strong>
                          {
                            item.title
                          }
                        </strong>

                        <span>
                          × 1
                        </span>

                      </div>

                      <strong>
                        {formatCheckoutPrice(productPrice, isIndia)}
                      </strong>

                    </div>
                  );
                }
              )}

            </div>

            <div className="checkout-order-prices">

              <div>

                <span>
                  Product subtotal
                </span>

                <strong>
                  {formatCheckoutPrice(individualSubtotal, isIndia)}
                </strong>

              </div>

              {isBundle &&
                bundleSaving > 0 && (
                  <div className="checkout-saving">

                    <span>
                      Collection saving
                    </span>

                    <strong>
                      −
                      {formatCheckoutPrice(bundleSaving, isIndia)}
                    </strong>

                  </div>
                )}

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  {formatCheckoutPrice(subtotal, isIndia)}
                </strong>

              </div>

              {discount > 0 && (
                <div className="checkout-saving">

                  <span>
                    Coupon discount
                  </span>

                  <strong>
                    −
                    {formatCheckoutPrice(discount, isIndia)}
                  </strong>

                </div>
              )}

            </div>

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                {formatCheckoutPrice(total, isIndia)}
              </strong>

            </div>

            <div className="checkout-order-payment">

              <div className="checkout-payment-logo">

                <CreditCard size={17} />

              </div>

              <div>

                <strong>
                  {isIndia
                    ? "Razorpay"
                    : "PayPal"}
                </strong>

                <span>
                  Secure digital
                  payment
                  processing.
                </span>

              </div>

            </div>

            <div className="checkout-digital">

              <CheckCircle2 size={16} />

              <div>

                <strong>
                  Digital delivery
                </strong>

                <span>
                  No shipping
                  required. Your
                  purchase is
                  delivered
                  digitally.
                </span>

              </div>

            </div>

            {isIndia ? (
              <>
                <button
                  className="checkout-place-order"
                  type="button"
                  onClick={
                    handlePlaceOrder
                  }
                  disabled={
                    processing
                  }
                >

                  {processing ? (
                    <>

                      <Loader2
                        size={17}
                        className="checkout-spinner"
                      />

                      PROCESSING...

                    </>
                  ) : (
                    <>

                      <LockKeyhole
                        size={17}
                      />

                      PLACE ORDER —{" "}

                      {formatCheckoutPrice(total, isIndia)}

                    </>
                  )}

                </button>

                <p className="checkout-secure-text">

                  <LockKeyhole size={12} />

                  Secure payment
                  powered by
                  Razorpay

                </p>
              </>
            ) : (
              <>
                <div
                  style={{
                    marginTop: "4px",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      shape: "rect",
                      label: "paypal",
                      height: 48,
                    }}
                    disabled={
                      processing
                    }
                    forceReRender={[
                      total,
                      form.country,
                      form.state,
                      form.email,
                      appliedCoupon,
                    ]}
                    createOrder={
                      handlePayPalCreateOrder
                    }
                    onApprove={
                      handlePayPalApprove
                    }
                    onError={
                      handlePayPalError
                    }
                  />
                </div>

                <p className="checkout-secure-text">

                  <LockKeyhole size={12} />

                  Secure payment
                  powered by
                  PayPal

                </p>
              </>
            )}

          </aside>

        </div>

        <footer className="checkout-footer">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/refund">
            Refund Policy
          </Link>

          <span>
            © 2026 Business Playbook
          </span>

        </footer>

      </main>

    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function CheckoutHeader() {
  return (
    <header className="checkout-header">

      <Link
        to="/"
        className="checkout-logo"
      >
        BP<span>.</span>
      </Link>

      <div className="checkout-header-secure">

        <LockKeyhole size={14} />

        SECURE CHECKOUT

      </div>

    </header>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function CheckoutField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
}) {
  return (
    <div className="checkout-field">

      <label>

        {label}

        {required && (
          <b>*</b>
        )}

      </label>

      <div
        className={`checkout-input ${
          error
            ? "has-error"
            : ""
        }`}
      >

        {icon}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={
            placeholder
          }
        />

      </div>

      {error && (
        <small className="checkout-field-error">
          {error}
        </small>
      )}

    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function CheckoutSelect({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select",
  error,
}) {
  return (
    <div className="checkout-field">

      <label>

        {label}

        {required && (
          <b>*</b>
        )}

      </label>

      <div
        className={`checkout-input ${
          error
            ? "has-error"
            : ""
        }`}
      >

        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          disabled={
            !options.length
          }
        >

          <option value="">
            {placeholder}
          </option>

          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>

        <ChevronDown
          size={13}
        />

      </div>

      {error && (
        <small className="checkout-field-error">
          {error}
        </small>
      )}

    </div>
  );
}

/* =========================================================
   EMPTY CART ICON
========================================================= */

function ShoppingBagIcon() {
  return (
    <div className="checkout-empty-icon">
      <Tag size={42} />
    </div>
  );
}

export default Checkout;