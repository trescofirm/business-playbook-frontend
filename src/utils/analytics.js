const pushToDataLayer = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(data);
};

/* =========================================================
   META PIXEL HELPERS
   All site prices are computed in USD.
========================================================= */

const META_CURRENCY = "USD";

const trackMeta = (eventName, params = {}, eventId) => {
  try {
    if (
      typeof window === "undefined" ||
      typeof window.fbq !== "function"
    ) {
      return;
    }

    if (eventId) {
      window.fbq("track", eventName, params, {
        eventID: String(eventId),
      });
    } else {
      window.fbq("track", eventName, params);
    }
  } catch (error) {
    console.error("Meta Pixel error:", error);
  }
};

const metaBookParams = (book) => ({
  content_ids: [book.id],
  content_name: book.title,
  content_type: "product",
  contents: [
    {
      id: book.id,
      quantity: 1,
      item_price: Number(book.price),
    },
  ],
  value: Number(book.price),
  currency: META_CURRENCY,
});

const metaCartParams = (items = [], value) => ({
  content_ids: items.map((item) => item.item_id),
  content_type: "product",
  contents: items.map((item) => ({
    id: item.item_id,
    quantity: item.quantity || 1,
    item_price: Number(item.price),
  })),
  num_items: items.length,
  value: Number(value),
  currency: META_CURRENCY,
});

/* Stops a page refresh from counting the same purchase twice */
const purchaseAlreadyTracked = (transactionId) => {
  try {
    const key = `bp_meta_purchase_${transactionId}`;

    if (localStorage.getItem(key)) {
      return true;
    }

    localStorage.setItem(key, "1");
  } catch {
    /* storage unavailable: allow the event */
  }

  return false;
};

/* =========================================================
   EVENTS
========================================================= */

export const trackViewItem = (book) => {
  if (!book) return;

  pushToDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      value: Number(book.price),
      items: [
        {
          item_id: book.id,
          item_name: book.title,
          price: Number(book.price),
          quantity: 1,
        },
      ],
    },
  });

  trackMeta("ViewContent", metaBookParams(book));
};

export const trackAddToCart = (book) => {
  if (!book) return;

  pushToDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency: "USD",
      value: Number(book.price),
      items: [
        {
          item_id: book.id,
          item_name: book.title,
          price: Number(book.price),
          quantity: 1,
        },
      ],
    },
  });

  trackMeta("AddToCart", metaBookParams(book));
};

export const trackBeginCheckout = ({
  items,
  value,
  currency = "USD",
}) => {
  pushToDataLayer({
    event: "begin_checkout",
    ecommerce: {
      currency,
      value: Number(value),
      items,
    },
  });

  trackMeta("InitiateCheckout", metaCartParams(items, value));
};

export const trackAddPaymentInfo = ({
  items,
  value,
  currency = "USD",
}) => {
  pushToDataLayer({
    event: "add_payment_info",
    ecommerce: {
      currency,
      value: Number(value),
      items,
    },
  });

  trackMeta("AddPaymentInfo", metaCartParams(items, value));
};

export const trackPurchase = ({
  transactionId,
  items,
  value,
  currency = "USD",
}) => {
  if (!transactionId) return;

  pushToDataLayer({
    event: "purchase",
    ecommerce: {
      transaction_id: transactionId,
      currency,
      value: Number(value),
      items,
    },
  });

  if (!purchaseAlreadyTracked(transactionId)) {
    trackMeta(
      "Purchase",
      metaCartParams(items, value),
      transactionId
    );
  }
};