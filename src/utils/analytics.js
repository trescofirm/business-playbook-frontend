const pushToDataLayer = (data) => {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push(data);
};

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
};