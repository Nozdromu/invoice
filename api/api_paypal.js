
const path = require('path')
const { exec } = require('child_process')

function api_paypal(_database) {

    var api = { all: {}, get: {}, put: {}, delete: {}, post: {} }
    var trips = _database.data.trips
    const base = "https://api-m.paypal.com"
    var api_key = process.env.paypal_api_key_live;
    var api_secret = process.env.paypal_api_secret_live
    if (process.env.INV == 'dev') {
        api_key = process.env.paypal_api_key_sandbox;
        api_secret = process.env.paypal_api_secret_sandbox
        base = "https://api-m.sandbox.paypal.com";
    }

    const generateAccessToken = async () => {
        try {
            if (!api_key || !api_secret) {
                throw new Error("MISSING_API_CREDENTIALS");
            }
            const auth = Buffer.from(
                api_key + ":" + api_secret
            ).toString("base64");
            const response = await fetch(`${base}/v1/oauth2/token`, {
                method: "POST",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error("Failed to generate Access Token:", error);
        }
    };
    async function handleResponse(response) {
        try {
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                httpStatusCode: response.status,
            };
        } catch (err) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    }
    const createOrder = async (trip) => {
        // use the cart information passed from the front-end to calculate the purchase unit details
        console.log(
            "shopping cart information passed from the frontend createOrder() callback:",
            trip
        );

        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;

        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: trip.total * 1.05
                    },
                    reference_id: trip.invoice
                },
            ],
        };


        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only).
                // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        return handleResponse(response);
    };

    const captureOrder = async (orderID) => {
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only).
                // Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });

        return handleResponse(response);
    };

    api.post.orders = async (req, res) => {
        try {
            // use the cart information passed from the front-end to calculate the order amount detals
            const { invoice } = req.body;
            const { jsonResponse, httpStatusCode } = await createOrder(trips[invoice]);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to create order." });
        }
    }

    api.get.capture = async (req, res) => {
        try {
            const { orderID } = req.query;
            const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to capture order." });
        }
    }

    api.get.evn = (req, res) => {
        var _url = 'https://www.paypal.com/sdk/js?client-id=' + api_key;
        res.send({ url: _url })
    }


    return api
}
module.exports = api_paypal

//     const path = require('path')
//     const { exec } = require('child_process')