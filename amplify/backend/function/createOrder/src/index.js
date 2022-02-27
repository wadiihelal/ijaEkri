const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const ORDER_TABLE = "Order-igpqmaphlrdodjgumizzzw7msy-dev";
const ORDER_TYPE = "Order";
const BOOK_ORDER_TABLE = "BookOrder-igpqmaphlrdodjgumizzzw7msy-dev";
const BOOK_ORDER_TYPE = "BookOrder";
const BOOK_TABLE = "Book-igpqmaphlrdodjgumizzzw7msy-dev";


const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }
  );
}

const createOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createBookOrder = async (payload) => {

  let bookOrders = [];
  for (let i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    bookOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: BOOK_ORDER_TYPE,
          book_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][BOOK_ORDER_TABLE] = bookOrders;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};

const deleteItemFromDb = async (payload) => {

  for (let i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];

    var params = {
      TableName: BOOK_TABLE,
      Key: {
        id: cartItem.id
      },
    };

    documentClient.delete(params, function (err, data) {
      console.log("test")
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      }
    });

  }
};
/*
 * Get order details from processPayment lambda
 * Create an order
 * Link books to the order - Users can see the past orders and admins can view orders by user
 * Email the invoice (Will be added later)
 */
exports.handler = async (event) => {
  try {
    let payload = event.prev.result;

    payload.order_id = uuidv4();


    //delete books from db
    await deleteItemFromDb(payload);

    // create a new order
    await createOrder(payload);

    // links books with the order
    await createBookOrder(payload);



    // Note - You may add another function to email the invoice to the user

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};