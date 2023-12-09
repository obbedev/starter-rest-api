export class SessionService {
    private static sessionData: {} = {};

    static getUserData(): {} | null {
        return SessionService.sessionData["userData"] || null;
    }

    static setUserData(userData: {}): void {
        SessionService.sessionData["userData"] = userData;
    }

    static getUserId(): string | null {
        return SessionService.sessionData["userData"]?.id || null;
    }

    static isLogged():boolean {
        return !!SessionService.getUserId();
    }
}
