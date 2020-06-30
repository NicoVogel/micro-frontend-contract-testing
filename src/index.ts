import { initConsumerMocks } from "./consumerMock";

initConsumerMocks()
  .then((recordings) => {
    console.log(recordings);
  });