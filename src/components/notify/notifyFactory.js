const defaultOptions = {
    position: 'bl',
    autoDismiss: 5
};

export const create = (opts = {}, level = 'success') => {
    return {
        ...opts,
        uid: opts.uid || new Date().getTime(),
        level
    };
};


export const success = (message, title = '') => {
    return create({
        message,
        title,
        ...defaultOptions
    }, 'success');
};

export const error = (message, title = '') => {
    return create({
        message,
        title,
        ...defaultOptions
    }, 'error');
};

export const warning = (message, title = '') => {
    return create({
        message,
        title,
        ...defaultOptions
    }, 'warning');
};

export const info = (message, title = '') => {
    return create({
        message,
        title,
        ...defaultOptions
    }, 'info');
};