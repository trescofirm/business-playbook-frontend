import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import {
  books,
  collection,
} from "../data/content";


/* =========================================================
   COLLECTION PRICE
========================================================= */

const COLLECTION_PRICE =
  Number(
    collection?.price ?? 45
  );


/* =========================================================
   INDIVIDUAL TOTAL
=========================================================

   Book 1  → $19.99
   Book 2  → $15.99
   Book 3  → $15.99

   Total    → $51.97
========================================================= */

const INDIVIDUAL_TOTAL =
  books
    .slice(0, 3)
    .reduce(
      (sum, book) =>
        sum +
        Number(book.price || 0),
      0
    );


/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const navigate =
    useNavigate();

  const {
    cartItems,
    cartCount,
    subtotal,
    discount,
    total,
    coupon,
    bundleSaving,
    applyCoupon,
    removeItem,
    addBooksToCart,
  } = useCart();


  /* =======================================================
     STATE
  ======================================================= */

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    cartOpen,
    setCartOpen,
  ] = useState(false);

  const [
    couponInput,
    setCouponInput,
  ] = useState("");

  const [
    couponMessage,
    setCouponMessage,
  ] = useState("");


  /* =====================================================
     OPEN CART EVENT
  ===================================================== */

  useEffect(() => {
    const openCart = () => {
      setCartOpen(true);
    };

    window.addEventListener(
      "cart:open",
      openCart
    );

    return () => {
      window.removeEventListener(
        "cart:open",
        openCart
      );
    };
  }, []);


  /* =====================================================
     LOCK BODY SCROLL
  ===================================================== */

  useEffect(() => {
    if (
      menuOpen ||
      cartOpen
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    menuOpen,
    cartOpen,
  ]);


  /* =====================================================
     SCROLL TO SECTION
  ===================================================== */

  const scrollTo = (id) => {
    setMenuOpen(false);

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };


  /* =====================================================
     OPEN CART
  ===================================================== */

  const openCart = () => {
    setCartOpen(true);
  };


  /* =====================================================
     CLOSE CART
  ===================================================== */

  const closeCart = () => {
    setCartOpen(false);
  };


  /* =====================================================
     BUY ALL 3 BOOKS
  ===================================================== */

  const handleBuyCollection = () => {
    addBooksToCart(
      books.slice(0, 3)
    );

    setMenuOpen(false);

    setTimeout(() => {
      setCartOpen(true);
    }, 150);
  };


  /* =====================================================
     CHECKOUT
  ===================================================== */

  const handleCheckout = () => {
    if (
      !cartItems.length
    ) {
      return;
    }

    setCartOpen(false);

    navigate("/checkout");
  };


  /* =====================================================
     COUPON
  ===================================================== */

  const handleCoupon = () => {
    const result =
      applyCoupon(
        couponInput
      );

    setCouponMessage(
      result.message
    );

    if (
      result.success
    ) {
      setCouponInput("");
    }
  };


  /* =====================================================
     PRICE FORMAT
  ===================================================== */

  const formatPrice = (
    price
  ) => {
    return Number(
      price || 0
    ).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <div className="navbar-container">


          {/* =================================================
              BRAND
          ================================================= */}

          <button
            className="brand"
            onClick={() =>
              scrollTo("home")
            }
            type="button"
            aria-label="Go to home"
          >
            <span className="brand-mark">
              BP.
            </span>

            <span className="brand-name">
              BUSINESS PLAYBOOK
            </span>
          </button>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >

            <button
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >
              THE BOOKS
            </button>


            <button
              onClick={() =>
                scrollTo("author")
              }
              type="button"
            >
              AUTHOR
            </button>


            <button
              onClick={() =>
                scrollTo("faq")
              }
              type="button"
            >
              FAQ
            </button>

          </nav>


          {/* =================================================
              RIGHT NAV ACTIONS
          ================================================= */}

          <div className="nav-actions">


            {/* ===============================================
                CART
            =============================================== */}

            <button
              className="cart-button"
              onClick={openCart}
              type="button"
              aria-label={`Open cart${
                cartCount > 0
                  ? `, ${cartCount} items`
                  : ""
              }`}
            >
              <ShoppingBag
                size={19}
              />

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </button>


            {/* ===============================================
                DESKTOP GET ALL 3 BOOKS
            =============================================== */}

            <button
              className="nav-buy"
              onClick={
                handleBuyCollection
              }
              type="button"
              aria-label="Get all 3 books for $45"
            >

              <span className="nav-buy-title">
                GET ALL 3 BOOKS
              </span>


              <span className="nav-buy-dash">
                —
              </span>


              <strong className="nav-buy-current">
                $
                {COLLECTION_PRICE.toFixed(
                  0
                )}
              </strong>


              <del className="nav-buy-old">
                $
                {INDIVIDUAL_TOTAL.toFixed(
                  2
                )}
              </del>


              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />

            </button>


            {/* ===============================================
                MOBILE MENU
            =============================================== */}

            <button
              className="menu-button"
              onClick={() =>
                setMenuOpen(
                  (value) =>
                    !value
                )
              }
              type="button"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                menuOpen
              }
            >

              {menuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}

            </button>

          </div>

        </div>


        {/* =====================================================
            FULLSCREEN MOBILE MENU
        ===================================================== */}

        <div
          className={`fullscreen-menu ${
            menuOpen
              ? "fullscreen-menu-open"
              : ""
          }`}
        >

          <div className="fullscreen-menu-inner">


            {/* =================================================
                MENU LABEL
            ================================================= */}

            <div className="mobile-menu-label">
              MENU
            </div>


            {/* =================================================
                BOOKS
            ================================================= */}

            <button
              onClick={() =>
                scrollTo("pricing")
              }
              type="button"
            >
              <span>
                THE BOOKS
              </span>

              <ArrowUpRight
                size={20}
                aria-hidden="true"
              />
            </button>


            {/* =================================================
                AUTHOR
            ================================================= */}

            <button
              onClick={() =>
                scrollTo("author")
              }
              type="button"
            >
              <span>
                AUTHOR
              </span>

              <ArrowUpRight
                size={20}
                aria-hidden="true"
              />
            </button>


            {/* =================================================
                FAQ
            ================================================= */}

            <button
              onClick={() =>
                scrollTo("faq")
              }
              type="button"
            >
              <span>
                FAQ
              </span>

              <ArrowUpRight
                size={20}
                aria-hidden="true"
              />
            </button>


            {/* =================================================
                MOBILE COLLECTION OFFER
            ================================================= */}

            <button
              className="mobile-menu-buy"
              onClick={
                handleBuyCollection
              }
              type="button"
              aria-label="Get all 3 books for $45"
            >

              <div className="mobile-buy-content">

                <span className="mobile-buy-label">
                  LIMITED OFFER
                </span>


                <span className="mobile-buy-title">
                  GET ALL 3 BOOKS
                </span>


                <span className="mobile-buy-note">
                  Save $
                  {formatPrice(
                    INDIVIDUAL_TOTAL -
                      COLLECTION_PRICE
                  )}{" "}
                  on the complete collection
                </span>

              </div>


              <div className="mobile-buy-prices">

                <strong>
                  $
                  {COLLECTION_PRICE.toFixed(
                    0
                  )}
                </strong>


                <del>
                  $
                  {INDIVIDUAL_TOTAL.toFixed(
                    2
                  )}
                </del>


                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                />

              </div>

            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          CART OVERLAY
      ===================================================== */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={closeCart}
        />
      )}


      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <aside
        className={`cart-drawer ${
          cartOpen
            ? "cart-drawer-open"
            : ""
        }`}
        aria-label="Shopping cart"
      >


        {/* =================================================
            CART HEADER
        ================================================= */}

        <div className="cart-header">

          <div>

            <span className="cart-header-label">
              YOUR SELECTION
            </span>

            <h2>
              Your Cart
            </h2>

          </div>


          <button
            onClick={closeCart}
            type="button"
            aria-label="Close cart"
          >
            <X size={21} />
          </button>

        </div>


        {/* =================================================
            EMPTY CART
        ================================================= */}

        {cartItems.length === 0 ? (

          <div className="cart-empty">

            <ShoppingBag
              size={40}
            />

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add a book — or grab all
              three and upgrade your
              thinking.
            </p>

            <button
              className="cart-browse"
              onClick={() => {
                closeCart();

                scrollTo(
                  "pricing"
                );
              }}
              type="button"
            >
              EXPLORE THE BOOKS

              <ArrowUpRight
                size={17}
              />
            </button>

          </div>

        ) : (

          <>

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="cart-items">

              {cartItems.map(
                (item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-single-item">


                      {/* =======================================
                          BOOK IMAGE
                      ======================================= */}

                      <div className="cart-item-image">

                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                          />
                        )}

                      </div>


                      {/* =======================================
                          BOOK INFORMATION
                      ======================================= */}

                      <div className="cart-item-info">

                        <h3>
                          {item.title}
                        </h3>

                        <span>
                          $
                          {formatPrice(
                            item.price
                          )}
                        </span>

                      </div>


                      {/* =======================================
                          REMOVE ITEM
                      ======================================= */}

                      <button
                        className="remove-item"
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        type="button"
                        aria-label={`Remove ${item.title}`}
                        title="Remove item"
                      >
                        <X size={16} />
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>


            {/* =================================================
                CART BOTTOM
            ================================================= */}

            <div className="cart-bottom">


              {/* ===============================================
                  3 BOOK BUNDLE
              =============================================== */}

              {cartCount === 3 && (

                <div className="cart-bundle-price">

                  <div className="cart-bundle-price-top">

                    <span>
                      3-BOOK BUNDLE
                    </span>


                    <div>

                      <strong>
                        $
                        {COLLECTION_PRICE.toFixed(
                          2
                        )}
                      </strong>

                      <del>
                        $
                        {INDIVIDUAL_TOTAL.toFixed(
                          2
                        )}
                      </del>

                    </div>

                  </div>


                  <p>
                    Save $
                    {formatPrice(
                      INDIVIDUAL_TOTAL -
                        COLLECTION_PRICE
                    )}{" "}
                    with the complete collection
                  </p>

                </div>

              )}


              {/* ===============================================
                  OTHER BUNDLE SAVING
              =============================================== */}

              {bundleSaving > 0 &&
                cartCount !== 3 && (

                  <div className="cart-bundle-saving">
                    You save $
                    {formatPrice(
                      bundleSaving
                    )}
                  </div>

                )}


              {/* ===============================================
                  COUPON
              =============================================== */}

              <div className="coupon-area">

                <div className="coupon-input-row">

                  <input
                    type="text"
                    value={
                      couponInput
                    }
                    onChange={(
                      event
                    ) =>
                      setCouponInput(
                        event.target
                          .value
                      )
                    }
                    onKeyDown={(
                      event
                    ) => {

                      if (
                        event.key ===
                        "Enter"
                      ) {
                        handleCoupon();
                      }

                    }}
                    placeholder="Coupon code (optional)"
                    aria-label="Coupon code"
                  />


                  <button
                    onClick={
                      handleCoupon
                    }
                    type="button"
                  >
                    APPLY
                  </button>

                </div>


                {couponMessage && (

                  <p
                    className={
                      coupon === "PIR"
                        ? "coupon-success"
                        : "coupon-error"
                    }
                  >
                    {couponMessage}
                  </p>

                )}

              </div>


              {/* ===============================================
                  COUPON DISCOUNT
              =============================================== */}

              {discount > 0 && (

                <div className="cart-discount-row">

                  <span>
                    Coupon discount
                  </span>

                  <strong>
                    −$
                    {formatPrice(
                      discount
                    )}
                  </strong>

                </div>

              )}


              {/* ===============================================
                  TOTAL
              =============================================== */}

              <div className="cart-total">

                <span>
                  TOTAL
                </span>

                <div>

                  <strong>
                    $
                    {formatPrice(
                      total
                    )}
                  </strong>


                  {coupon && (

                    <del>
                      $
                      {formatPrice(
                        subtotal
                      )}
                    </del>

                  )}

                </div>

              </div>


              {/* ===============================================
                  CHECKOUT
              =============================================== */}

              <button
                className="checkout-button"
                onClick={
                  handleCheckout
                }
                type="button"
              >

                <span>
                  CHECKOUT — $
                  {formatPrice(
                    total
                  )}
                </span>

                <ArrowUpRight
                  size={19}
                />

              </button>


              {/* ===============================================
                  CART INFORMATION
              =============================================== */}

              <div className="cart-info">

                <div>

                  <span>
                    🔒
                  </span>

                  <span>
                    Secure payment ·
                    Cards & supported
                    payment methods
                  </span>

                </div>


                <div>

                  <span>
                    ⚡
                  </span>

                  <span>
                    Instant email
                    delivery · Digital
                    books
                  </span>

                </div>

              </div>

            </div>

          </>

        )}

      </aside>
    </>
  );
}


export default Navbar;