self.addEventListener("push", function(event) {

    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        data = {
            title: "Messie Chat",
            body: event.data
                ? event.data.text()
                : "Nouveau message"
        };
    }

    const title =
        data.title || "Messie Chat";

    const options = {

        body:
            data.body ||
            "Vous avez reçu un nouveau message.",

        icon:
            data.icon ||
            "/icon.png",

        badge:
            data.badge ||
            "/icon.png",

        data:
            data.data || {}

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
                    return clients.openWindow("/");
                }

            })
        );

    }
);
