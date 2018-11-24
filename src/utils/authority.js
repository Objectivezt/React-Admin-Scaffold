import { projectName } from 'common/config';
export function getAuthority() {
    return localStorage.getItem(projectName) || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem(projectName, authority);
}
