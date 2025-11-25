    export const createControlledPromise = () => {
      let complete: any = null;
      let reject: any = null;
      let status: 'pending' | 'fulfilled' | 'rejected' = 'pending';
      
      const promise = new Promise((resolve, reject) => {
        complete = (value: any) => {
          status = 'fulfilled';
          resolve(value);
        };
        reject = (reason: any) => {
          status = 'rejected'; 
          reject(reason);
        };
      });

      return {
        promise,
        complete,
        reject,
        get status() {
          return status;
        }
      };
    };