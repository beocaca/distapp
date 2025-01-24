import _ from "lodash"
import moment from "moment"
import * as jose from 'jose'

export const getMimeTypeFromosType = (osType?: OsType): string => {
    return osType == 'android' ? 'application/vnd.android.package-archive,.aab' : '.ipa'
}

export type OsType = 'android' | 'ios'

export const getExtensionFromMimeType = (mimeType: string | undefined) => {
    if (mimeType === 'application/vnd.android.package-archive') {
        return 'apk'
    } else if (mimeType === 'application/x-authorware-bin' || mimeType === '.aab') {
        return 'aab'
    } else if (mimeType === 'application/octet-stream' || mimeType === '.ipa') {
        return 'ipa'
    }
    return mimeType
}

export function formatBytes(bytes: number | null | undefined, decimals = 2, isBinary = false) {
    if (!bytes) {
        return undefined
    }
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; // or ['B', 'KB', 'MB', 'GB', 'TB']

    if (!+bytes) {
        return `0 ${sizes[0]}`;
    }

    const inByte = isBinary ? 1024 : 1000;
    const dm = decimals < 0 ? 0 : decimals;

    const pow = Math.floor(Math.log(bytes) / Math.log(inByte));
    const maxPow = Math.min(pow, sizes.length - 1);

    return `${parseFloat((bytes / Math.pow(inByte, maxPow)).toFixed(dm))} ${sizes[maxPow]
        }`;
}

export const formatDate = (value?: string | null) => {
    return value ? moment(value).format('LLL') : '-'
}

export const isIosDevice = () => /(iPad|iPhone|iPod)/g.test(navigator.userAgent) || (/(Mac OS)/g.test(navigator.userAgent) && "ontouchend" in document)

export const generateManifestLink = (manifestData: any, orgName: string, appName: string, releaseId: string, publicLink: string | undefined) => {
    const data = {
        ...manifestData,
        orgName,
        appName,
        releaseId,
        publicLink,
    }
    const dataStr = btoa(JSON.stringify(data))
    const dd = encodeURIComponent(`?data=${dataStr}`)
    return `itms-services://?action=download-manifest&url=${window.location.origin}/api/manifest.plist${dd}`
}

export const decodeJwt = (value: string) => {
    return jose.decodeJwt(value)
}

export type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem'
import type { MenuItemCommandEvent } from 'primevue/menuitem'

export const navigateFromTab = (event: MenuItemCommandEvent) => {
    navigateTo({
        name: event.item.routeName,
        params: event.item.routeParams,
    })
}
