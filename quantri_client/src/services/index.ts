import { API_VERSION, HOST_PATH } from "@/data"

export * from "../features/auth/services"
export * from "./base"

String.prototype.PrefixWithBaseURL = function(version) {
    const apiVersion = version || API_VERSION
    return `${HOST_PATH}/${apiVersion}/${this}`;
};