import {User} from "../types/api-types";

export function substring(value: string) {
    return `${value.substring(0, 40)}...`
}

export function lineBreak(value: string) {
    return `${value.substring(0, 30)}\n${value.substring(31, value.length)}`
}

export function substringImageName(value: string) {
    if (value.length < 31) return value
    return `${value.substring(0, 28)} ... ${value.substring(value.length - 4)}`
}

export function sortUsersByRegistrationDate(users: Array<User>) {
    return users.sort((a, b) => (a.registration_timestamp < b.registration_timestamp) ? 1 : -1)
}

export const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/
export const emailRegExp =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
