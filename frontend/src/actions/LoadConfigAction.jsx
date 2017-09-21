// import Notification from '../utility/Notification';
import Backend from '../services/Backend';


export default function (context, payload, done) {
    Backend.doGet('/config', (err, data) => {
        if (err) {
            console.error ('error loading config: ' + err);
        }
        else {
            context.dispatch ('configLoaded', data);
        }
        done (err, data);
    });
}
