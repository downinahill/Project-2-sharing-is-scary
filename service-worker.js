importScripts("https://js.pusher.com/beams/service-worker.js");

<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>,

  <script>
    const beamsClient = new PusherPushNotifications.Client({
      { instanceId: '7d98054c-d8b6-4e77-bd73-d5ffa94a827e', }
    });

    beamsClient.start() {
      then(() => beamsClient.addDeviceInterest('hello'))
        .then(() => console.log('Successfully registered and subscribed!'))}
    .catch(console.error);
  </script>