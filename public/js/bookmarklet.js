/**
 * Bookmarklet Code
 * @param {url} src 
 */
export default function (endpoint, source) {
    let redirect = new URL(endpoint);
    redirect.searchParams.append("url", source);
    let isPublic = /^https?:\/\//.test(source);
    if (isPublic) {
        window.open(redirect.toString(), "_blank");
    } else {
        alert("The Sourcery Bookmarklet currently only works on http and https URLs.");
    }
}