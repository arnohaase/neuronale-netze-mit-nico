import request from 'superagent';
import Notifications from './Notifications';
import pluginNoCache from 'superagent-no-cache';

function handleResponse (done) {
    return (err, res) => {
        if (err) {
            if (err.timeout) {
                Notifications.error("Der Server antwortet nicht - bitte versuchen Sie es später noch einmal");
            } else if (err.status) {
                if (err.status >= 500) Notifications.error("Netzwerkproblem");
                else if (err.status >= 400) Notifications.error("Der Server hat die Aktion abgelehnt");
                else Notifications.error("Server-Problem - bitte versuchen Sie es später noch einmal");
            }
            else {
                Notifications.error("Server-Problem - bitte versuchen Sie es später noch einmal");
            }

            if (err.status) {
                err.statusCode = err.status;
            }
            done(err, res);
        }
        else {
            if (res.type === 'text/html') {
                // This is a hack because XHR requrest *follow* redirects rather than returning a 3xx status
                Notifications.error("Bitte melden Sie sich neu an");
            }
            else {
                done(null, res.body);
            }
        }
    }
}

const timeout = 5000;

const Backend = {
    doGet (uri, done) {
        return request.get (encodeURI (uri))
            .use(pluginNoCache)
            .timeout (timeout)
            .redirects(0)
            .accept ('application/json')
            .end (handleResponse (done));
    },
    doPost (uri, data, done) {
        return request.post (encodeURI (uri))
            .timeout (timeout)
            .redirects(0)
            .accept ('application/json')
            .set ('Content-Type', 'application/json')
            .send (data)
            .end (handleResponse (done));
    },
    doDelete (uri, done) {
        return request.delete (encodeURI (uri))
            .timeout (timeout)
            .redirects(0)
            .accept ('application/json')
            .end (handleResponse (done));
    }
};

export default Backend;
