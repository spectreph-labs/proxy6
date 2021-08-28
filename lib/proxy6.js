"use strict";

const request = require("request");

const DEFAULT_COUNT = 1;
const DEFAULT_PERIOD = 90;
const DEFAULT_VERSION = 4;

class Proxy6 {
  constructor(apiKey) {
    this.apiKey = apiKey || process.env.PROXY6_NET_API_KEY;
    if (!this.apiKey)
      throw Error(
        "must supply API key as PROXY6_NET_API_KEY or constructor argument"
      );
  }
  async _call(method, params) {
    const response = await new Promise((resolve, reject) =>
      request(
        {
          method: "GET",
          qs: params || {},
          url: "https://proxy6.net/api/" + this.apiKey + "/" + method + "/",
        },
        (err, resp) => (err ? reject(err) : resolve(resp))
      )
    );
    return JSON.parse(response.body);
  }
  async getprice({
    count = DEFAULT_COUNT,
    period = DEFAULT_PERIOD,
    version = DEFAULT_VERSION,
  }) {
    return await this._call("getprice", { count, period, version });
  }
  async getcount({ country = DEFAULT_COUNTRY, version = DEFAULT_VERSION }) {
    return await this._call("getcount", { country, version });
  }
  async getcountry({ version = DEFAULT_VERSION }) {
    return await this._call("getcountry", { version });
  }
  async getproxy({ state = DEFAULT_STATE, descr = "", nokey }) {
    return await this._call("getproxy", { state, descr, nokey });
  }
  async settype({ ids, type }) {
    return await this._call("settype", { ids, type });
  }
  async setdescr({ new: newVar, old, ids }) {
    return await this._call("setdescr", { new: newVar, old, ids });
  }
  async buy({
    count,
    period,
    country,
    version,
    type,
    descr,
    auto_prolong,
    nokey,
  }) {
    return await this._call("buy", {
      count,
      period,
      country,
      version,
      type,
      descr,
      auto_prolong,
      nokey,
    });
  }
  async prolong({ period, ids, nokey }) {
    return await this._call("prolong", { period, ids, nokey });
  }
  async delete({ ids, descr }) {
    return await this._call("delete", { ids, descr });
  }
  async check({ ids }) {
    return await this._call("check", { ids });
  }
}
module.exports.Proxy6 = Proxy6;
