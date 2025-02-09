/* eslint-disable no-unused-vars */

/**
 * When 'null' can be returned:
 * @returns {null}
*/
type NullishString = string | null
type NullishHTMLElem = HTMLElement | null
type NullishButton = HTMLButtonElement | HTMLElement | null

/**
 * When 'undefined' can be returned:
 * @returns {undefined}
*/
type UndefinedishString = string | undefined
type UndefinedishHTMLElem = HTMLElement | undefined
type UndefinedishButton = HTMLButtonElement | HTMLElement | undefined

/**
 * When 'null | undefined' can be returned:
 * @returns {null | undefined}
*/
type UndefNullishString = string | null | undefined
type UndefNullishHTMLElem = HTMLElement | null | undefined
type UndefNullishButton = HTMLButtonElement | HTMLElement | null | undefined
