// const 

export const getSetting = async function() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_setting'], function (result) {
            resolve(result['ts_ext_setting']);
        });
    });
}

export const setSetting = function(setting) {
    chrome.storage.local.set({ts_ext_setting: setting}, function (result) {
    });
}

export const pushSaveVideo = function(videoAdd) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_save_list'], function (result) {
            let dataAdd = []
            if(typeof result['ts_ext_save_list'] == 'undefined')
                dataAdd = []
            else
                dataAdd = result['ts_ext_save_list']
            let isExists = dataAdd.filter(function (item) {
                                return item.id == videoAdd.id
                            }).length;
            if(isExists == 0) {
                while (dataAdd.length > 10) {
                    dataAdd.pop()
                }
                dataAdd.unshift(videoAdd)
                chrome.storage.local.set({ts_ext_save_list: dataAdd}, function (res) {
                });
                resolve(dataAdd)
            }
            reject({ error: 'is_exists' })
        });
    });
}

export const deleteSaveVideo = function(id) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_save_list'], function (result) {
            let dataRemove = []
            if(typeof result['ts_ext_save_list'] == 'undefined')
                dataRemove = []
            else
                dataRemove = result['ts_ext_save_list']

            dataRemove = dataRemove.filter(function (item) {
                                return item.id != id
                            });
            chrome.storage.local.set({ts_ext_save_list: dataRemove}, function (res) {
            });
            resolve(dataRemove);
        });
    });
}

export const getSaveVideo = function() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_save_list'], function (result) {
            resolve(result['ts_ext_save_list']);
        });
    });
}

export const pushWhiteUrl = function(urlAdd) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_white_urls'], function (result) {
            let dataAdd = []
            if(typeof result['ts_ext_white_urls'] == 'undefined')
                dataAdd = []
            else
                dataAdd = result['ts_ext_white_urls']
            let isExists = dataAdd.filter(function (url) {
                                return url == urlAdd
                            }).length;
            if(isExists == 0) {
                dataAdd.unshift(urlAdd)
                chrome.storage.local.set({ts_ext_white_urls: dataAdd}, function (res) {
                });
                resolve(dataAdd)
            }
            reject({ error: 'is_exists' })
        });
    });
}

export const editWhiteUrl = function(oldUrl, newUrl) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_white_urls'], function (result) {
            let dataAdd = []
            if(typeof result['ts_ext_white_urls'] == 'undefined')
                dataAdd = []
            else
                dataAdd = result['ts_ext_white_urls']
            let isExists = dataAdd.filter(function (url) {
                                return url == newUrl
                            }).length;
            if(isExists == 0) {
                dataAdd = dataAdd.map(function (url) {
                                if(url == oldUrl) {
                                    return newUrl
                                }
                                return url
                            })
                chrome.storage.local.set({ts_ext_white_urls: dataAdd}, function (res) {
                });
                resolve(dataAdd)
            }
            reject({ error: 'is_exists' })
        });
    });
}

export const deleteWhiteUrl = function(urlDelete) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_white_urls'], function (result) {
            let dataRemove = []
            if(typeof result['ts_ext_white_urls'] == 'undefined')
                dataRemove = []
            else
                dataRemove = result['ts_ext_white_urls']

            dataRemove = dataRemove.filter(function (url) {
                                return url != urlDelete
                            });
            chrome.storage.local.set({ts_ext_white_urls: dataRemove}, function (res) {
            });
            resolve(dataRemove);
        });
    });
}

export const getWhiteUrl = function() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['ts_ext_white_urls'], function (result) {
            resolve(result['ts_ext_white_urls']);
        });
    });
}

