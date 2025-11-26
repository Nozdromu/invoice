function api_ai() {
    async function handleFunctionCall(fnName, args) {
        const fn = FUNCTIONS[fnName];

        if (!fn) throw new Error(`Function not found: ${fnName}`);

        console.log(`[Router] 调用函数 → ${fnName}`);
        console.log(`参数:`, args);

        return await fn(args);
    }

}
module.exports = api_ai