export function getRequestPage(request_token: string, redirectUrl: string) {
    return window.open(
        `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectUrl}`,
        "the movie db",
        "width=650,height=600,top=100,left=100",
    );
}
