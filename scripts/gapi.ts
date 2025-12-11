// let __GAPI_INITIALIZED = false;

// function initGapi(apiKey: string) {
//   if (__GAPI_INITIALIZED) {
//     return Promise.resolve(window.gapi);
//   }

//   return new Promise((resolve, reject) => {
//     window.gapi.load("client", () => {
//       window.gapi.client.init({ apiKey });

//       window.gapi.client
//         .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(
//           () => {
//             __GAPI_INITIALIZED = true;
//             console.log("GAPI client loaded for API");
//             resolve(window.gapi);
//           },
//           (error) => {
//             console.error("Error loading GAPI client for API", error);
//             reject(error);
//           },
//         );
//     });
//   });
// }

// export function createGapiLoader() {
//   return async () => {
//     return {
//       // gapi: await initGapi("AIzaSyA5KT0TDrv2mPljjFmzz2I5FncQil-8yPM"),
//     };
//   };
// }

// // async info(gapi: any) {
// //   const response = await gapi.client.youtube.videos.list({
// //     part: ["snippet"],
// //     id: [this.id],
// //   });

// //   return response.result.items[0];
// // }
