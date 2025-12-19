const { default: axios } = require("axios");


function api_ai() {
    var ai_api = { all: {}, get: {}, put: {}, delete: {}, post: {} }



    ////////////////////////////////////////////////////////////
    //  ai

    const llm_url = "http://lulu-pc:8080/v1/chat/completions";


    const FUNCTIONS = {
        // get_schedule: async ({ date }) => {
        //     // 你自己的服务，这里示例 GET 请求
        //     const result = "jinrumeishi";
        //     return result.data; // 返回纯文本或对象
        // },

        // weather: async ({ city }) => {
        //     const result = await axios.get(`https://wttr.in/${city}?format=3`);
        //     return result.data;
        // },

        test: async ({ }) => {
            return 'success';
        }
    };




    async function handleFunctionCall(fnName, args) {
        const fn = FUNCTIONS[fnName];

        if (!fn) throw new Error(`Function not found: ${fnName}`);

        console.log(`[Router] 调用函数 → ${fnName}`);
        console.log(`参数:`, args);

        return await fn(args);
    }

    // /ask 接收用户提问
    ai_api.get.ask = (req, res) => {
        console.log(req.query)
        const userPrompt = req.query.prompt;
        console.log("\n=== 用户输入 ===", userPrompt);
        axios.post(llm_url, {
            "messages": [
                {
                    "role": "user",
                    "content": userPrompt
                }
            ]
        }).then((data) => {
            console.log(data.data.choices[0].message)
            res.send(data.data.choices[0].message);
        })

        // 第一次请求 → 让 LLM 决定是否要调用函数
        // const llmResp = await axios.post(llm_url, {
        //     prompt: userPrompt,
        //     stream: false,
        //     functions: [
        //         {
        //             name: "test",
        //             description: "call test",
        //             parameters: {
        //                 type: "object",
        //                 properties: {
        //                     date: { type: "string", description: "YYYY-MM-DD" }
        //                 },
        //                 required: ["date"]
        //             }
        //         }
        //     ]
        // });

        // const resp = llmResp.data;
        // console.log("=== 模型输出 ===", resp);

        // // 检测是否要调用函数
        // if (resp.function_call) {
        //     const { name, arguments: args } = resp.function_call;
        //     const parsedArgs = JSON.parse(args);

        //     const fnResult = await handleFunctionCall(name, parsedArgs);

        //     console.log("=== 函数执行结果 ===", fnResult);

        //     // 第二次请求 → 把函数结果发回 LLM 组织语言回答
        //     const finalResp = await axios.post(LLM_URL, {
        //         function_call_response: {
        //             name,
        //             content: typeof fnResult === "string" ? fnResult : JSON.stringify(fnResult)
        //         }
        //     });

        //     return res.json(finalResp.data);

        // 没有 function call → 直接返回内容
        //res.json(resp);
    };

    ///////////////////////////////////////////////////////////////
    return ai_api

}
module.exports = api_ai