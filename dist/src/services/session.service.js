export class SessionService {
    static getUserData() {
        return SessionService.sessionData["userData"] || null;
    }
    static setUserData(userData) {
        SessionService.sessionData["userData"] = userData;
    }
    static getUserId() {
        return SessionService.sessionData["userData"]?.id || null;
    }
    static isLogged() {
        return !!SessionService.getUserId();
    }
}
SessionService.sessionData = {};
