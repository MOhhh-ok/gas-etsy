"use strict";
class Etsy {
    constructor(apiKey, apiSecret) {
        const prop = PropertiesService.getScriptProperties();
        this.apiKey = apiKey ? apiKey : prop.getProperty('ETSY_API_KEY') || '';
        this.apiSecret = apiSecret ? apiSecret : prop.getProperty('ETSY_API_SECRET') || '';
        if (!this.apiKey || !this.apiSecret) {
            throw new Error('ETSY_API_KEY or ETSY_API_SECRET is not set.');
        }
    }
    makeOptions(method) {
        return {
            'method': method,
            'headers': {
                'x-api-key': this.apiKey,
            },
        };
    }
    requestJson(method, urlPath, payload) {
        const options = this.makeOptions(method);
        const response = UrlFetchApp.fetch("https://api.etsy.com/v3/" + urlPath, options);
        const txt = response.getContentText();
        const json = JSON.parse(txt);
        return json;
    }
    getUsers() {
        const data = this.requestJson("get", "application/provisional-users");
        console.log(JSON.stringify(data, null, 2));
        //GET application/provisional-users
        // Returns all provisional users currently added for your application. Initially, this will be an empty list, []. This list does not include the user who owns the application, so seeing an empty list does not indicate that you can no longer authenticate as the application owner.
    }
    addUser(userId) {
        const data = this.requestJson("post", "application/provisional-users/:" + userId);
        console.log(JSON.stringify(data, null, 2));
    }
    getListingsByShop(shopId) {
        const path = "application/shops/" + shopId + "/listings";
        const json = this.requestJson("get", path);
        console.log(JSON.stringify(json, null, 2));
    }
    findAllActiveListingsByShop(shopId) {
        const path = "application/shops/" + shopId + "/listings/active";
        const json = this.requestJson("get", path);
        console.log(JSON.stringify(json, null, 2));
    }
}
function etsyTest() {
    const test = new Etsy();
    test.findAllActiveListingsByShop("14355593");
    return;
    test.getUsers();
    test.addUser("masaota5681@gmail.com");
    test.getUsers();
}
