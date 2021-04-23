const _padded = (text, level) => {
    return `--- ${level <= 0 ? text : _padded(text, level - 1)}`;
}

export const describe = (func, desciption, level = 1) => {
    console.log(_padded(`Executing ${desciption}.`, level));

    const _startTimestamp = +new Date();
    const _res = func();

    if (_res && typeof _res.then === "function") {
        return _res.then((value) => {
            console.log(_padded(`Async ${desciption} done in ${((+new Date() - _startTimestamp) / 1000.0).toFixed(3)} seconds.`, level));
            return value;
        });
    }

    console.log(_padded(`${desciption} done in ${((+new Date() - _startTimestamp) / 1000.0).toFixed(3)} seconds.`, level));

    return _res;
}
