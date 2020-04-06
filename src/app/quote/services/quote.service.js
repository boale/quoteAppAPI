const { Inject, Injectable } = require('@mindjs/common');

const { QUOTESY } = require('../DI.tokens');

class QuoteService {
  static get parameters() {
    return [
      Inject(QUOTESY),
    ];
  }

  constructor(quotesy) {
    this.quotesy = quotesy;
  }

  /**
   *
   * @return {Promise<{text:string, author:string, [source]:string, [tags]:string}[]>}
   */
  async getAll() {
    return this.quotesy.parse_json();
  }

  /**
   *
   * @return {Promise<{text:string, author:string, [source]:string, [tags]:string}>}
   */
  async getRandom() {
    return this.quotesy.random();
  }

  /**
   *
   * @param {string} tag
   * @return {Promise<{text:string, author:string, [source]:string, [tags]:string}|*>}
   */
  async getRandomByTag(tag) {
    return this.quotesy.random_by_tag(tag);
  }
}

module.exports = Injectable(QuoteService);
