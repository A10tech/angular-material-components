/**
 * Validator for input file accept
 * @param accept Allowable type of file
 */
export function AcceptValidator(accept) {
    return (ctrl) => {
        if (!accept) {
            throw 'AcceptValidator: allowable type of file can not be empty';
        }
        if (ctrl.value == null)
            return null;
        if (!accept.includes(ctrl.value.type)) {
            return {
                accept: true,
            };
        }
        return null;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZpbGUtaW5wdXQvc3JjL2xpYi92YWxpZGF0b3JzL2FjY2VwdC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxNQUFjO0lBQzVDLE9BQU8sQ0FBQyxJQUFxQixFQUEyQixFQUFFO1FBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sMERBQTBELENBQUM7UUFDbkUsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3RDLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLElBQUk7YUFDYixDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogVmFsaWRhdG9yIGZvciBpbnB1dCBmaWxlIGFjY2VwdFxuICogQHBhcmFtIGFjY2VwdCBBbGxvd2FibGUgdHlwZSBvZiBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBY2NlcHRWYWxpZGF0b3IoYWNjZXB0OiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gIHJldHVybiAoY3RybDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIGlmICghYWNjZXB0KSB7XG4gICAgICB0aHJvdyAnQWNjZXB0VmFsaWRhdG9yOiBhbGxvd2FibGUgdHlwZSBvZiBmaWxlIGNhbiBub3QgYmUgZW1wdHknO1xuICAgIH1cblxuICAgIGlmIChjdHJsLnZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKCFhY2NlcHQuaW5jbHVkZXMoY3RybC52YWx1ZS50eXBlKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXB0OiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cbiJdfQ==