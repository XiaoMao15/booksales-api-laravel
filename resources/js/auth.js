export function getAuthUser() {
    if (!localStorage.getItem('auth_token')) {
        return null;
    }

    try {
        const user = JSON.parse(localStorage.getItem('auth_user'));

        return user && typeof user === 'object' && !Array.isArray(user)
            ? user
            : null;
    } catch {
        return null;
    }
}

export function hasRole(role, user = getAuthUser()) {
    return user?.role === role;
}
