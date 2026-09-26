import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   CART CONTEXT
========================================================= */

const CartContext = createContext(null);

/* =========================================================
   STORAGE KEY
========================================================= */

const CART_STORAGE_KEY =
  "business_playbook_cart";

/* =========================================================
   VALID BOOKS
========================================================= */

const VALID_BOOK_IDS = [
  "how-to-attract-women",
  "dopamine-detox",
  "unlock-focus",
];

/* =========================================================
   USD-ONLY PRICES
========================================================= */

const BOOK_PRICES = {
  "how-to-attract-women": 19.99,

  "dopamine-detox": 15.99,

  "unlock-focus": 15.99,
};

/* =========================================================
   OLD / REFERENCE PRICES
========================================================= */

const BOOK_OLD_PRICES = {
  "how-to-attract-women": 25.0,
  "dopamine-detox": 20.0,
  "unlock-focus": 20.0,
};

/* =========================================================
   COMPLETE COLLECTION
========================================================= */

const COLLECTION_PRICE = 45.0;

/* =========================================================
   CURRENCY
========================================================= */

const DEFAULT_CURRENCY = "USD";

/* =========================================================
   COUPONS
========================================================= */

const COUPONS = {
  PIR: {
    type: "percentage",
    value: 0.10,
    message: "Coupon applied — 10% discount added.",
  },
};

/* =========================================================
   GET BOOK PRICE
========================================================= */

const getBookPrice = (id) => {
  return Number(BOOK_PRICES[id]) || 0;
};

/* =========================================================
   GET OLD BOOK PRICE
========================================================= */

const getBookOldPrice = (id) => {
  const value = BOOK_OLD_PRICES[id];

  return value == null
    ? null
    : Number(value);
};

/* =========================================================
   GET COLLECTION PRICE
========================================================= */

const getCollectionPrice = () => {
  return Number(COLLECTION_PRICE) || 0;
};

/* =========================================================
   GET CURRENCY FROM COUNTRY
========================================================= */

/* =========================================================
   CURRENCY SYMBOL
========================================================= */

const getCurrencySymbol = () => "$";

/* =========================================================
   FORMAT PRICE
========================================================= */

const formatPrice = (
  value,
  currency
) => {
  const amount = Number(
    value || 0
  );

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/* =========================================================
   CLEAN CART
========================================================= */

const cleanCart = (
  items,
  currency = DEFAULT_CURRENCY
) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const uniqueItems = [];

  items.forEach((item) => {
    if (!item?.id) {
      return;
    }

    if (
      !VALID_BOOK_IDS.includes(
        item.id
      )
    ) {
      return;
    }

    const alreadyExists =
      uniqueItems.some(
        (existing) =>
          existing.id === item.id
      );

    if (alreadyExists) {
      return;
    }

    uniqueItems.push({
      id: item.id,

      title:
        item.title || "",

      price:
        getBookPrice(
          item.id,
          currency
        ),

      oldPrice:
        getBookOldPrice(
          item.id,
          currency
        ),

      image:
        item.image ||
        item.images?.cover ||
        null,

      description:
        item.description || "",

      quantity: 1,
    });
  });

  return uniqueItems;
};

/* =========================================================
   CART PROVIDER
========================================================= */

export function CartProvider({
  children,
}) {
  /* =======================================================
     CURRENCY STATE
  ======================================================= */

  const [currency, setCurrency] =
    useState(
      DEFAULT_CURRENCY
    );

  /* =======================================================
     CART STATE
  ======================================================= */

  const [cartItems, setCartItems] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            CART_STORAGE_KEY
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return cleanCart(
          parsed,
          DEFAULT_CURRENCY
        );
      } catch (error) {
        console.error(
          "Unable to load cart:",
          error
        );

        return [];
      }
    });

  /* =======================================================
     COUPON STATE
  ======================================================= */

  const [coupon, setCoupon] =
    useState("");

  /* =======================================================
     UPDATE CART WHEN CURRENCY CHANGES
  ======================================================= */

  useEffect(() => {
    setCartItems((items) =>
      cleanCart(
        items,
        currency
      )
    );
  }, [currency]);

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cartItems]);

  /* =======================================================
     CHANGE CURRENCY
  ======================================================= */

  const changeCurrency = (
    nextCurrency
  ) => {
    if (
      nextCurrency !== "USD"
    ) {
      return;
    }

    if (
      nextCurrency === currency
    ) {
      return;
    }

    setCurrency(
      nextCurrency
    );

    /*
     * Coupon is revalidated after
     * currency changes.
     */
    setCoupon("");
  };

  /* =======================================================
     SET COUNTRY
  ======================================================= */

  const setCountry = () => {
    changeCurrency("USD");
  };

  /* =======================================================
     ADD ONE BOOK
  ======================================================= */

  const addToCart = (
    product
  ) => {
    if (!product?.id) {
      return;
    }

    if (
      !VALID_BOOK_IDS.includes(
        product.id
      )
    ) {
      return;
    }

    setCartItems((items) => {
      const exists =
        items.some(
          (item) =>
            item.id ===
            product.id
        );

      if (exists) {
        return items;
      }

      const newBook = {
        id: product.id,

        title:
          product.title || "",

        price:
          getBookPrice(
            product.id,
            currency
          ),

        oldPrice:
          getBookOldPrice(
            product.id,
            currency
          ),

        image:
          product.image ||
          product.images?.cover ||
          null,

        description:
          product.description ||
          "",

        quantity: 1,
      };

      return [
        ...items,
        newBook,
      ];
    });
  };

  /* =======================================================
     ADD MULTIPLE BOOKS
  ======================================================= */

  const addBooksToCart = (
    products
  ) => {
    if (!Array.isArray(products)) {
      return;
    }

    setCartItems((items) => {
      const existingIds =
        new Set(
          items.map(
            (item) => item.id
          )
        );

      const newBooks =
        products
          .filter((product) => {
            if (!product?.id) {
              return false;
            }

            if (
              !VALID_BOOK_IDS.includes(
                product.id
              )
            ) {
              return false;
            }

            if (
              existingIds.has(
                product.id
              )
            ) {
              return false;
            }

            return true;
          })
          .map((product) => ({
            id: product.id,

            title:
              product.title || "",

            price:
              getBookPrice(
                product.id,
                currency
              ),

            oldPrice:
              getBookOldPrice(
                product.id,
                currency
              ),

            image:
              product.image ||
              product.images?.cover ||
              null,

            description:
              product.description ||
              "",

            quantity: 1,
          }));

      return [
        ...items,
        ...newBooks,
      ];
    });
  };

  /* =======================================================
     REMOVE ONE BOOK
  ======================================================= */

  const removeItem = (
    id
  ) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          item.id !== id
      )
    );

    /*
     * Removing a book can change
     * bundle eligibility.
     */
    setCoupon("");
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
    setCoupon("");
  };

  /* =======================================================
     BOOK COUNT
  ======================================================= */

  const bookCount =
    Math.min(
      cartItems.length,
      3
    );

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount =
    bookCount;

  /* =======================================================
     INDIVIDUAL SUBTOTAL
  ======================================================= */

  const actualSubtotal =
    Number(
      cartItems
        .reduce(
          (
            sum,
            item
          ) =>
            sum +
            getBookPrice(
              item.id,
              currency
            ),
          0
        )
        .toFixed(2)
    );

  /* =======================================================
     COLLECTION / CURRENT SUBTOTAL
  ======================================================= */

  const collectionTotal =
    bookCount === 3
      ? getCollectionPrice(
          currency
        )
      : actualSubtotal;

  /* =======================================================
     BUNDLE SAVING
  ======================================================= */

  const bundleSaving =
    bookCount === 3
      ? Number(
          (
            actualSubtotal -
            getCollectionPrice(
              currency
            )
          ).toFixed(2)
        )
      : 0;

  /* =======================================================
     INDIVIDUAL SAVING
  ======================================================= */

  const individualSaving =
    bundleSaving;

  /* =======================================================
     CURRENT COUPON CONFIG
  ======================================================= */

  const couponConfig =
    COUPONS[coupon];

  /* =======================================================
     COUPON RATE
  ======================================================= */

  const couponRate =
    couponConfig?.type ===
    "percentage"
      ? couponConfig.value
      : 0;

  /* =======================================================
     DISCOUNT
  ======================================================= */

  let discount = 0;

  if (couponConfig) {
    if (
      couponConfig.type ===
      "fixed"
    ) {
      discount =
        Math.min(
          Number(couponConfig.value || 0),
          collectionTotal
        );
    } else if (
      couponConfig.type ===
      "percentage"
    ) {
      discount =
        Number(
          (
            collectionTotal *
            couponConfig.value
          ).toFixed(2)
        );
    }
  }

  /* =======================================================
     FINAL TOTAL
  ======================================================= */

  const total =
    Math.max(
      0,
      Number(
        (
          collectionTotal -
          discount
        ).toFixed(2)
      )
    );

  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal =
    total;

  /* =======================================================
     SUBTOTAL
  ======================================================= */

  const subtotal =
    collectionTotal;

  /* =======================================================
     APPLY COUPON
  ======================================================= */

  const applyCoupon = (
    code
  ) => {
    const normalizedCode =
      String(code || "")
        .trim()
        .toUpperCase();

    if (!normalizedCode) {
      setCoupon("");

      return {
        success: false,

        message:
          "Please enter a coupon code.",
      };
    }

    if (bookCount === 0) {
      setCoupon("");

      return {
        success: false,

        message:
          "Add a book before applying a coupon.",
      };
    }

    /* ================================================
       USD
    ================================================ */

    if (normalizedCode === "PIR") {
      setCoupon(normalizedCode);

      return {
        success: true,
        message: "Coupon applied — 10% discount added.",
      };
    }

    /* ================================================
       WRONG COUPON
    ================================================ */

    setCoupon("");

    return {
      success: false,

      message: "Invalid coupon. Use PIR.",
    };
  };

  /* =======================================================
     REMOVE COUPON
  ======================================================= */

  const removeCoupon = () => {
    setCoupon("");
  };

  /* =======================================================
     FORMATTED PRICES
  ======================================================= */

  const formattedActualSubtotal =
    formatPrice(
      actualSubtotal,
      currency
    );

  const formattedSubtotal =
    formatPrice(
      subtotal,
      currency
    );

  const formattedBundleSaving =
    formatPrice(
      bundleSaving,
      currency
    );

  const formattedDiscount =
    formatPrice(
      discount,
      currency
    );

  const formattedTotal =
    formatPrice(
      total,
      currency
    );

  /* =======================================================
     CONTEXT PROVIDER
  ======================================================= */

  return (
    <CartContext.Provider
      value={{
        /* -----------------------------------------------
           CART
        ----------------------------------------------- */

        cartItems,

        cartCount,

        bookCount,

        /* -----------------------------------------------
           CURRENCY
        ----------------------------------------------- */

        currency,

        currencySymbol:
          getCurrencySymbol(
            currency
          ),

        changeCurrency,

        setCountry,

        /* -----------------------------------------------
           PRICES
        ----------------------------------------------- */

        subtotal,

        actualSubtotal,

        collectionTotal,

        bundleSaving,

        individualSaving,

        collectionPrice:
          getCollectionPrice(
            currency
          ),

        discount,

        couponRate,

        total,

        cartTotal,

        /* -----------------------------------------------
           FORMATTED PRICES
        ----------------------------------------------- */

        formattedActualSubtotal,

        formattedSubtotal,

        formattedBundleSaving,

        formattedDiscount,

        formattedTotal,

        /* -----------------------------------------------
           COUPON
        ----------------------------------------------- */

        coupon,

        applyCoupon,

        removeCoupon,

        /* -----------------------------------------------
           ACTIONS
        ----------------------------------------------- */

        addToCart,

        addBooksToCart,

        removeItem,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================================================
   USE CART
========================================================= */

export function useCart() {
  const context =
    useContext(
      CartContext
    );

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}