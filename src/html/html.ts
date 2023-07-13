import install from "./install.html"
import info from "./info.html"

export const INSTALL_HTML: string = install
export const INFO_HTML: string = info

export function renderInfo(msg: string): string {
    return INFO_HTML.replace("[MESSAGE]", btoa(msg));
}