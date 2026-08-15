self.addEventListener("push", function(event) {

    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        console.error("Erreur données push :", error);
    }

    const title =
        data.title || "Messie Chat";

    const options = {
        body:
            data.body || "Nouveau message reçu",
        icon:
            data.icon || "/icon-192.png",
        badge:
            data.badge || "/icon-192.png",
        data:
            data.url || "/"
    };

    event.waitUntil(
        self.registration.showNotification(
            title,
            options
        )
    );
});


self.addEventListener(
    "notificationclick",
    function(event) {

        event.notification.close();

        event.waitUntil(
            clients.matchAll({
                type: "window",
                includeUncontrolled: true
            }).then(function(clientList) {

                for (const client of clientList) {

                    if ("focus" in client) {
                        return client.focus();
                    }

                }

                if (clients.openWindow) {
                    return clients.openWindow(
                        event.notification.data || "/"
                    );
                }

            })
        );
    }
);
