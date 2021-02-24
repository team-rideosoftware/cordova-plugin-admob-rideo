import { buildEvents, exec, translateOptions } from './utils'

/**
 * Banner config object.
 * @typedef {BaseConfig} BannerConfig
 * @property {boolean} [bannerAtTop=false]
 * set to true, to put banner at top
 * @property {boolean} [overlap=true]
 * set to true, to allow banner overlap webview
 * @property {boolean} [offsetTopBar=false]
 * set to true to avoid ios7 status bar overlap
 * @property {string} [size=SMART_BANNER] - {@link BANNER_SIZE}
 */

const events = buildEvents('banner', [
  'LOAD',
  'LOAD_FAIL',
  'OPEN',
  'CLOSE',
])

/**
 * @typedef {Object} BANNER_SIZE
 * @property {string} FLUID - FLUID
 * @property {string} BANNER - BANNER
 * @property {string} IAB_MRECT - IAB_MRECT
 * @property {string} IAB_BANNER - IAB_BANNER
 * @property {string} LARGE_BANNER - LARGE_BANNER
 * @property {string} SMART_BANNER - SMART_BANNER
 * @property {string} IAB_LEADERBOARD - IAB_LEADERBOARD
 */
/**
 * @constant
 * @type {Object}
 */
const sizes = {
  FLUID: 'FLUID',
  BANNER: 'BANNER',
  IAB_MRECT: 'IAB_MRECT',
  IAB_BANNER: 'IAB_BANNER',
  LARGE_BANNER: 'LARGE_BANNER',
  SMART_BANNER: 'SMART_BANNER',
  IAB_LEADERBOARD: 'IAB_LEADERBOARD',
  // android-only
  SEARCH: 'SEARCH',
  FULL_BANNER: 'FULL_BANNER',
  LEADERBOARD: 'LEADERBOARD',
  WIDE_SKYSCRAPER: 'WIDE_SKYSCRAPER',
  MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
}

/**
 * @protected
 * @desc
 * See usage in {@link banner}.
 */
class Banner {
  static events = events

  /**
   * Banner sizes
   * @type {BANNER_SIZE}
   */
  static sizes = sizes

  /**
   * @protected
   * @param {BannerConfig} opts - Initial config.
   */
  constructor(opts) {
    this.config({
      size: sizes.SMART_BANNER,
      ...opts,
    })
  }

  /**
   * Update config.
   *
   * @param {BannerConfig} opts - New config.
   * @returns {BannerConfig} Updated config.
   */
  config(opts) {
    this._config = {
      ...this._config,
      ...opts,
    }
    return this._config
  }

  /**
   * Create banner.
   *
   * @returns {Promise} Excutaion result promise.
   */
  prepare() {
    const options = {
      publisherId: this._config.id,
      ...this._config,
    }
    delete options.id
    return exec('createBannerView', [translateOptions(options)])
  }

  /**
   * Show the banner.
   *
   * @returns {Promise} Excutaion result promise.
   */
  show() {
    return exec('showAd', [true])
  }

  /**
   * Hide the banner.
   *
   * @returns {Promise} Excutaion result promise.
   */
  hide() {
    return exec('showAd', [false])
  }

  /**
   * Remove the banner.
   *
   * @returns {Promise} Excutaion result promise.
   */
  remove() {
    return exec('destroyBannerView', [])
  }
}

export { Banner }
