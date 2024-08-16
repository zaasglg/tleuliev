const formatPhoneNumber = ({phoneNumber}: {phoneNumber: string}) => {
    const cleaned = phoneNumber.replace(/[^0-9+]/g, "");

    const startsWithPlus = cleaned.startsWith("+");
    const prefix = startsWithPlus ? "+" : "";

    const normalizedNumber = prefix + cleaned.replace(/^\+/, "");

    return normalizedNumber;
};


export default formatPhoneNumber