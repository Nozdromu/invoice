function create_api(callback, type = 'get') {
    return { callback: callback, type: type }
}