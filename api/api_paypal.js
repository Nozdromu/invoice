
const path = require('path')
const { exec } = require('child_process')
const {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
    PaypalExperienceLandingPage,
    PaypalExperienceUserAction,
    ShippingPreference,
} = require("@paypal/paypal-server-sdk");

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.paypal_api_key_live,
        oAuthClientSecret: process.env.paypal_api_secret_live,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
});

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

function api_paypal(_database) {

    var api = { all: {}, get: {}, put: {}, delete: {}, post: {} }
    var trips = _database.data.trips
    var database = _database;
    var base = "https://api-m.paypal.com"
    var CLIENT_ID = process.env.paypal_api_key_live;
    var APP_SECRET = process.env.paypal_api_secret_live
    // if (process.env.INV == 'dev') {
    //     api_key = process.env.paypal_api_key_sandbox;
    //     api_secret = process.env.paypal_api_secret_sandbox
    //     base = "https://api-m.sandbox.paypal.com";
    // }

    // const generateAccessToken = async () => {
    //     try {
    //         if (!api_key || !api_secret) {
    //             throw new Error("MISSING_API_CREDENTIALS");
    //         }
    //         const auth = Buffer.from(
    //             api_key + ":" + api_secret
    //         ).toString("base64");
    //         const response = await fetch(`${base}/v1/oauth2/token`, {
    //             method: "POST",
    //             body: "grant_type=client_credentials",
    //             headers: {
    //                 Authorization: `Basic ${auth}`,
    //             },
    //         });

    //         const data = await response.json();
    //         return data.access_token;
    //     } catch (error) {
    //         console.error("Failed to generate Access Token:", error);
    //     }
    // };
    // async function handleResponse(response) {
    //     try {
    //         const jsonResponse = await response.json();
    //         return {
    //             jsonResponse,
    //             httpStatusCode: response.status,
    //         };
    //     } catch (err) {
    //         const errorMessage = await response.text();
    //         throw new Error(errorMessage);
    //     }
    // }
    // const createOrder = async (trip) => {
    //     // use the cart information passed from the front-end to calculate the purchase unit details
    //     console.log(
    //         "shopping cart information passed from the frontend createOrder() callback:",
    //         trip
    //     );

    //     const accessToken = await generateAccessToken();
    //     const url = `${base}/v2/checkout/orders`;

    //     const payload = {
    //         intent: "CAPTURE",
    //         id: trip.invoice,
    //         purchase_units: [
    //             {
    //                 reference_id: trip.invoice,
    //                 amount: {
    //                     currency_code: "USD",
    //                     value: trip.total * 1.05
    //                 }
    //             },
    //         ],
    //     };


    //     const response = await fetch(url, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${accessToken}`,
    //             // Uncomment one of these to force an error for negative testing (in sandbox mode only).
    //             // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    //         },
    //         method: "POST",
    //         body: JSON.stringify(payload),
    //     });

    //     return handleResponse(response);
    // };

    // const captureOrder = async (orderID) => {
    //     const accessToken = await generateAccessToken();
    //     const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${accessToken}`,
    //             // Uncomment one of these to force an error for negative testing (in sandbox mode only).
    //             // Documentation:
    //             // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
    //             // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    //         },
    //     });

    //     return handleResponse(response);
    // };

    // api.post.orders = async (req, res) => {
    //     try {
    //         // use the cart information passed from the front-end to calculate the order amount detals
    //         const { invoice } = req.body;
    //         const { jsonResponse, httpStatusCode } = await createOrder(trips[invoice]);
    //         res.status(httpStatusCode).json(jsonResponse);
    //     } catch (error) {
    //         console.error("Failed to create order:", error);
    //         res.status(500).json({ error: "Failed to create order." });
    //     }
    // }



    // api.get.evn = (req, res) => {
    //     var _url = 'https://www.paypal.com/sdk/js?client-id=' + api_key;
    //     res.send({ url: _url })
    // }
    const baseURL = {
        sandbox: "https://api-m.sandbox.paypal.com",
        production: "https://api-m.paypal.com"
    };
    var pay_url = "https://api-m.paypal.com"
    // if () {
    //     pay_url = "https://api-m.sandbox.paypal.com";
    // }
    async function createOrder(trip) {
        // const accessToken = await generateAccessToken();
        // const url = `${pay_url}/v2/checkout/orders`;
        // var price = (trip.total * 1.05).toFixed(2);
        // console.log("price: ", price)
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        //     body: JSON.stringify({
        //         intent: "CAPTURE",
        //         purchase_units: [{
        //             amount: {
        //                 currency_code: "USD",
        //                 value: price, // Use the price from the trip object
        //             },
        //         },],
        //     }),
        // });
        // const data = await response.json();
        // return data;
        var price = (trip.total * 1.05 + trip.extra).toFixed(2);
        const collect = {
            body: {
                intent: "CAPTURE",
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: "USD",
                            value: price,
                            breakdown: {
                                itemTotal: {
                                    currencyCode: "USD",
                                    value: price,
                                },
                            },
                        },
                        items: [
                            {
                                name: "Trips",
                                unitAmount: {
                                    currencyCode: "USD",
                                    value: price,
                                },
                                quantity: "1",
                                description: "trips",
                                sku: "sku01",
                            },
                            // {
                            //     name: "extra",
                            //     unitAmount: {
                            //         currencyCode: "USD",
                            //         value: trip.extra,
                            //     },
                            //     quantity: "1",
                            //     description: "extra",
                            //     sku: "sku02",
                            // },
                        ]
                    }
                ]
            },
            prefer: "return=minimal",
        }
        try {
            const { body, ...httpResponse } = await ordersController.createOrder(
                collect
            );
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            return {
                jsonResponse: JSON.parse(body),
                httpStatusCode: httpResponse.statusCode,
            };
        } catch (error) {
            if (error instanceof ApiError) {
                // const { statusCode, headers } = error;
                throw new Error(error.message);
            }
        }
    }


    api.post.orders = async (req, res) => {
        try {
            const { id, extra } = req.body.cart[0];
            trips[id].extra = extra;
            const { jsonResponse, httpStatusCode } = await createOrder(trips[id]);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to create order." });
        }
    };

    //////////////////////////////////////////////////////////////////////
    api.post.capture = async (req, res) => {
        // const {
        //     orderID
        // } = req.body;
        // const captureData = await capturePayment(orderID);
        // // TODO: store payment information such as the transaction ID
        // res.json(captureData);
        try {
            const { orderID, invoice, extra } = req.body;
            const { jsonResponse, httpStatusCode } = await capturePayment(orderID);

            var trip = trips[invoice];
            trip.payment_type = 'Paypal Bussiness'
            trip.extra = extra;
            trip.transID = jsonResponse.id
            trip.PP_fee = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value;
            trip.total = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value;
            trip.final_price = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value;
            console.log("trip: ", trip)
            database.trip_api.editrecord(trip, (results) => {
                trips[results.invoice] = results
                //res.status(httpStatusCode).json({ statu: 'done', trip: results })
                res.status(httpStatusCode).json(jsonResponse);
            })
            
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to capture order." });
        }
    };

    // api.get.capture = async (req, res) => {
    //     try {
    //         const { orderID } = req.query;
    //         const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    //         var invoice = jsonResponse.purchase_units[0].reference_id;
    //         var trip = trips[invoice];
    //         trip.payment_type = 'Paypal Bussiness'
    //         trip.transID = jsonResponse.id
    //         trip.PP_fee = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value;
    //         trip.total = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value;
    //         trip.final_price = jsonResponse.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value;
    //         database.trip_api.editrecord(trip, (results) => {
    //             trips[results.invoice] = results
    //             res.status(httpStatusCode).json({ statu: 'done', trip: results })
    //         })
    //        // res.status(httpStatusCode).json(jsonResponse);
    //     } catch (error) {
    //         console.error("Failed to create order:", error);
    //         res.status(500).json({ error: "Failed to capture order." });
    //     }
    // }
    //////////////////////
    // PayPal API helpers
    //////////////////////

    // Use the orders API to capture payment for an order
    async function capturePayment(orderId) {
        // const accessToken = await generateAccessToken();
        // const url = `${pay_url}/v2/checkout/orders/${orderId}/capture`;
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // });
        // const data = await response.json();
        // return data;
        const collect = {
            id: orderId,
            prefer: "return=minimal",
        };

        try {
            const { body, ...httpResponse } = await ordersController.captureOrder(
                collect
            );
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            return {
                jsonResponse: JSON.parse(body),
                httpStatusCode: httpResponse.statusCode,
            };
        } catch (error) {
            if (error instanceof ApiError) {
                // const { statusCode, headers } = error;
                throw new Error(error.message);
            }
        }
    }


    ////////////////////////////////////
    // api.get.evn = (req, res) => {
    //     var _url = '${pay_url}/sdk/js?client-id=' + api_key;
    //     res.send({ url: _url })
    // }
    return api
}
module.exports = api_paypal

//     const path = require('path')
//     const { exec } = require('child_process')