import { useState } from "react";

const useNotifications = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return { notification, showNotification };
};

export default useNotifications;