export function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}